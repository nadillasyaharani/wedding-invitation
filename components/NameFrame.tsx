import React from "react";

type Props = {
  children: React.ReactNode;
  /** Optional: kalau ornamen terlalu deket teks, naikin padding */
  paddingX?: string; // contoh: "clamp(56px, 12vw, 140px)"
};

export default function NameFrame({
  children,
  paddingX = "clamp(56px, 12vw, 140px)",
}: Props) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ORNAMEN KIRI */}
      <img
        src="/ornaments/name-frame-left.svg"
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(90px, 18vw, 180px)",
          height: "auto",
          opacity: 0.85,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ORNAMEN KANAN (mirror) */}
      <img
        src="/ornaments/name-frame-left.svg"
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%) scaleX(-1)",
          width: "clamp(90px, 18vw, 180px)",
          height: "auto",
          opacity: 0.85,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* KONTEN ASLI(nggak diubah, cuma dibungkus + dikasih padding biar nggak nabrak ornamen) */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          paddingLeft: paddingX,
          paddingRight: paddingX,
        }}
      >
        {children}
      </div>
    </div>
  );
}
