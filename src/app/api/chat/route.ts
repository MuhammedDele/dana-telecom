import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/chatKnowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * أرخص نموذج مناسب لمساعد أسئلة شائعة.
 * ملاحظة: عائلة 2.0 لا تحتوي "تفكير" (thinking) فلا تُحتسب رموز إضافية —
 * بعكس 2.5-flash التي كانت تستهلك ~287 رمز تفكير مقابل إجابة من 9 رموز.
 */
const MODEL = "gemini-2.0-flash-lite";
const MAX_MESSAGE_CHARS = 600;
const MAX_HISTORY = 8; // آخر 8 رسائل فقط (توفير تكلفة)

/* ---------- حد بسيط للطلبات لكل IP ----------
   ملاحظة: الذاكرة لا تدوم بين استدعاءات serverless، لذا هذا حاجز
   أولي فقط ضد إساءة الاستخدام السريعة وليس حماية كاملة. */
const WINDOW_MS = 60_000;
const MAX_REQ = 12;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 500) hits.clear(); // منع تضخم الذاكرة
  return arr.length > MAX_REQ;
}

type Msg = { role: "user" | "model"; text: string };

/**
 * تشخيص آمن: يؤكد فقط أن متغيّر البيئة موجود على الخادم.
 * لا يكشف المفتاح ولا أي جزء منه — الطول فقط للتأكد من عدم وجود مسافات/علامات اقتباس.
 * افتح /api/chat في المتصفح بعد النشر على Netlify للتحقق.
 */
export async function GET() {
  const k = process.env.GEMINI_API_KEY;
  return NextResponse.json({
    configured: Boolean(k),
    keyLength: k ? k.length : 0,
    hasWhitespace: k ? /\s/.test(k) : false,
    hasQuotes: k ? /^["']|["']$/.test(k) : false,
    model: MODEL,
  });
}

export async function POST(req: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "المساعد غير مُفعّل حاليًا. يرجى التواصل معنا مباشرة." },
      { status: 503 },
    );
  }

  const ip =
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "عدد كبير من الرسائل. يرجى الانتظار قليلًا ثم المحاولة مجددًا." },
      { status: 429 },
    );
  }

  let body: { message?: string; history?: Msg[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
  }

  const message = (body.message ?? "").toString().trim();
  if (!message) {
    return NextResponse.json({ error: "الرسالة فارغة." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return NextResponse.json(
      { error: `الرسالة طويلة جدًا (الحد ${MAX_MESSAGE_CHARS} حرف).` },
      { status: 400 },
    );
  }

  const history = Array.isArray(body.history) ? body.history.slice(-MAX_HISTORY) : [];

  const contents = [
    ...history
      .filter((m) => m && (m.role === "user" || m.role === "model") && m.text)
      .map((m) => ({
        role: m.role,
        parts: [{ text: String(m.text).slice(0, MAX_MESSAGE_CHARS) }],
      })),
    { role: "user", parts: [{ text: message }] },
  ];

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": key, // المفتاح في الترويسة وليس في الرابط
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
          contents,
          generationConfig: {
            temperature: 0.25,
            maxOutputTokens: 600,
            // لا thinkingConfig — نموذج 2.0-flash-lite لا يدعم التفكير أصلًا
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          ],
        }),
        signal: AbortSignal.timeout(25_000),
      },
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("Gemini error", res.status, detail.slice(0, 400));

      // رسائل مميّزة لكل سبب — حتى لا يضيع الوقت في تشخيص خاطئ
      if (res.status === 429) {
        return NextResponse.json(
          {
            error:
              "تجاوزنا الحد المسموح من الأسئلة حاليًا. يرجى المحاولة لاحقًا أو التواصل معنا مباشرة.",
            reason: "quota_exceeded",
          },
          { status: 429 },
        );
      }
      if (res.status === 401 || res.status === 403) {
        return NextResponse.json(
          {
            error: "المساعد غير مُهيّأ بشكل صحيح. يرجى التواصل معنا مباشرة.",
            reason: "invalid_api_key",
          },
          { status: 503 },
        );
      }
      return NextResponse.json(
        {
          error: "تعذّر الحصول على رد الآن. يرجى المحاولة بعد قليل أو التواصل معنا هاتفيًا.",
          reason: `upstream_${res.status}`,
        },
        { status: 502 },
      );
    }

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? "")
      .join("")
      .trim();

    if (!reply) {
      return NextResponse.json({
        reply:
          "عذرًا، لم أفهم سؤالك جيدًا. جرّب صياغته بطريقة أخرى، أو تواصل معنا مباشرة وسنساعدك.",
      });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("chat route error", err);
    return NextResponse.json(
      { error: "حدث خطأ في الاتصال. يرجى المحاولة لاحقًا." },
      { status: 500 },
    );
  }
}
