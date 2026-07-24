import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Cctv,
  Check,
  Clock,
  Clock3,
  CreditCard,
  QrCode,
  Smartphone,
  Sparkles,
  Eye,
  Handshake,
  Headset,
  House,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  RadioTower,
  SatelliteDish,
  ShieldCheck,
  Signal,
  Store,
  Target,
  Wallet,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * سجل الأيقونات المركزي — أيقونات متجهة (SVG) موحّدة الأسلوب.
 * أضف أي أيقونة جديدة هنا فقط ليبقى الموقع متناسقًا.
 */
export const iconRegistry = {
  // الخدمات
  wifi: Wifi,
  nanobeam: SatelliteDish,
  cameras: Cctv,
  // المزايا
  speed: Zap,
  shield: ShieldCheck,
  support: Headset,
  coverage: Signal,
  tower: RadioTower,
  // عام
  location: MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  chat: MessageCircle,
  wallet: Wallet,
  tip: Lightbulb,
  target: Target,
  vision: Eye,
  values: Handshake,
  home: House,
  store: Store,
  business: Building2,
  check: Check,
  plus: Plus,
  arrow: ArrowLeft,
  // الدفع والتصميم
  qr: QrCode,
  card: CreditCard,
  mobile: Smartphone,
  verified: BadgeCheck,
  sparkle: Sparkles,
  clock3: Clock3,
} as const;

export type IconKey = keyof typeof iconRegistry;

export function Icon({
  name,
  className = "",
  size = 24,
  strokeWidth = 1.75,
  style,
}: {
  name: IconKey;
  className?: string;
  size?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
}) {
  const Cmp: LucideIcon = iconRegistry[name];
  return (
    <Cmp
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      style={style}
      aria-hidden="true"
    />
  );
}
