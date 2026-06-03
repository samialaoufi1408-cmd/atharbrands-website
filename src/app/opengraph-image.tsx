import { ImageResponse } from "next/og";

export const alt = "ATHAR — Saudi Brand Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0F1113",
        padding: "72px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
        <div
          style={{
            display: "flex",
            width: "54px",
            height: "54px",
            borderRadius: "14px",
            border: "3px solid #D4AF7A",
          }}
        />
        <div style={{ display: "flex", fontSize: "30px", letterSpacing: "14px", color: "#D4AF7A" }}>
          ATHAR
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: "78px", color: "#F2EFE6", fontWeight: 600 }}>
          Legacy in Every Impact
        </div>
        <div style={{ display: "flex", fontSize: "30px", color: "#D4AF7A", marginTop: "20px" }}>
          Saudi Brand Studio
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", fontSize: "26px", color: "#D4AF7A" }}>atharbrands.com</div>
        <div style={{ display: "flex", fontSize: "22px", color: "#555B50" }}>
          Riyadh, Saudi Arabia
        </div>
      </div>
    </div>,
    { ...size }
  );
}
