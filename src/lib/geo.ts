import { coverageCities, type CoverageCity } from "./site";

/** المسافة بين نقطتين بالمتر (صيغة هافرساين) */
export function distanceM(
  a: [number, number],
  b: [number, number],
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export type CoverageResult =
  | {
      status: "wifi";
      city: CoverageCity;
      area: string;
      areaPercent: number;
    }
  | { status: "nanobeam"; city: CoverageCity; distanceM: number }
  | { status: "outside"; city: CoverageCity; distanceM: number };

/** يحدّد وضع التغطية لموقع المستخدم */
export function checkCoverage(pos: [number, number]): CoverageResult {
  // 1) هل هو داخل أحد أحياء الواي فاي؟
  for (const city of coverageCities) {
    for (const spot of city.wifiSpots) {
      if (distanceM(pos, [spot.lat, spot.lng]) <= spot.radiusM) {
        return {
          status: "wifi",
          city,
          area: spot.name,
          areaPercent: spot.percent,
        };
      }
    }
  }

  // 2) أقرب مدينة
  let nearest = coverageCities[0];
  let best = Infinity;
  for (const city of coverageCities) {
    const d = distanceM(pos, city.center);
    if (d < best) {
      best = d;
      nearest = city;
    }
  }

  // 3) داخل نطاق NanoBeam؟
  if (best <= nearest.nanobeamRadiusM) {
    return { status: "nanobeam", city: nearest, distanceM: best };
  }
  return { status: "outside", city: nearest, distanceM: best };
}

/** تنسيق المسافة بالعربية */
export function formatDistance(m: number): string {
  return m < 1000
    ? `${Math.round(m)} متر`
    : `${(m / 1000).toFixed(1)} كم`;
}
