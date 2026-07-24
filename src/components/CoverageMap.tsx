"use client";

import { Fragment } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { coverageLegend, type CoverageCity } from "@/lib/site";

/** دبوس مخصّص بألوان الهوية */
function pinIcon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="52" viewBox="0 0 40 52">
      <path d="M20 51C20 51 38 31 38 20C38 9.5 30 1 20 1C10 1 2 9.5 2 20C2 31 20 51 20 51Z"
            fill="#282369" stroke="#FFF200" stroke-width="2.5"/>
      <circle cx="20" cy="19.5" r="7.5" fill="#FFF200"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: "dana-pin",
    iconSize: [40, 52],
    iconAnchor: [20, 51],
    popupAnchor: [0, -46],
  });
}

/** دبوس موقع المستخدم */
function userIcon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="12" fill="#16a34a" fill-opacity="0.25"/>
      <circle cx="14" cy="14" r="6" fill="#16a34a" stroke="#fff" stroke-width="3"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: "dana-user-pin",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

export default function CoverageMap({
  city,
  userPos,
}: {
  city: CoverageCity;
  userPos?: [number, number] | null;
}) {
  return (
    <MapContainer
      // إعادة التركيب عند تبديل المدينة لضمان إعادة التمركز
      key={city.key}
      center={city.center}
      zoom={city.zoom}
      scrollWheelZoom={false}
      className="h-[400px] w-full sm:h-[520px]"
      style={{ background: "#ecebf5" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* طبقة NanoBeam — كامل المدينة وما حولها (أخضر) */}
      <Circle
        center={city.center}
        radius={city.nanobeamRadiusM}
        pathOptions={{
          color: coverageLegend.nanobeam.color,
          weight: 2,
          dashArray: "8 6",
          fillColor: coverageLegend.nanobeam.color,
          fillOpacity: 0.13,
        }}
      >
        <Tooltip sticky>
          <span style={{ fontWeight: 700 }}>
            تغطية NanoBeam — كامل {city.name} وما حولها
          </span>
        </Tooltip>
      </Circle>

      {/* طبقة الواي فاي — أحياء المدينة (أصفر) */}
      {city.wifiSpots.map((s) => (
        <Fragment key={s.name}>
          <Circle
            center={[s.lat, s.lng]}
            radius={s.radiusM}
            pathOptions={{
              color: "#282369",
              weight: 1.5,
              fillColor: coverageLegend.wifi.color,
              fillOpacity: 0.2 + (s.percent / 100) * 0.45,
            }}
          >
            <Tooltip direction="top" opacity={1}>
              <span style={{ fontWeight: 700 }}>
                {s.name} — واي فاي {s.percent}٪
              </span>
            </Tooltip>
            <Popup>
              <div style={{ direction: "rtl", textAlign: "right", minWidth: 170 }}>
                <strong style={{ color: "#282369", fontSize: 14 }}>{s.name}</strong>
                <div
                  style={{
                    margin: "8px 0 6px",
                    height: 8,
                    borderRadius: 99,
                    background: "#e6e7ef",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${s.percent}%`,
                      height: "100%",
                      borderRadius: 99,
                      background: "#FFF200",
                      border: "1px solid #282369",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#282369" }}>
                  تغطية الواي فاي: {s.percent}٪
                </div>
              </div>
            </Popup>
          </Circle>
        </Fragment>
      ))}

      {/* موقع المستخدم */}
      {userPos && (
        <Marker position={userPos} icon={userIcon()}>
          <Popup>
            <div style={{ direction: "rtl", textAlign: "right" }}>
              <strong style={{ color: "#16a34a" }}>موقعك الحالي</strong>
            </div>
          </Popup>
        </Marker>
      )}

      {/* دبوس المدينة */}
      <Marker position={city.center} icon={pinIcon()}>
        <Popup>
          <div style={{ direction: "rtl", textAlign: "right", minWidth: 210 }}>
            <strong style={{ color: "#282369", fontSize: 15 }}>{city.name}</strong>

            <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: "#282369" }}>
              واي فاي: {city.wifiPercent}٪
            </div>
            <div
              style={{
                margin: "5px 0 10px",
                height: 8,
                borderRadius: 99,
                background: "#e6e7ef",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${city.wifiPercent}%`,
                  height: "100%",
                  borderRadius: 99,
                  background: "#FFF200",
                  border: "1px solid #282369",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, color: "#16a34a" }}>
              NanoBeam: تغطية كاملة ✔
            </div>

            <p style={{ fontSize: 12, color: "#5c5c72", marginTop: 8, lineHeight: 1.6 }}>
              {city.note}
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
