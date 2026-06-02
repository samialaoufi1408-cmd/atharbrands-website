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
        background: "#0D1B2A",
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
            border: "3px solid #C8A96A",
          }}
        />
        <div style={{ display: "flex", fontSize: "30px", letterSpacing: "14px", color: "#C8A96A" }}>
          ATHAR
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: "82px", color: "#F6F3EE", fontWeight: 600 }}>
          Saudi Brand Studio
        </div>
        <div style={{ display: "flex", fontSize: "30px", color: "#DCCDB3", marginTop: "20px" }}>
          Strategy · Identity · Experience · Impact
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", fontSize: "26px", color: "#C8A96A" }}>atharbrands.com</div>
        <div style={{ display: "flex", fontSize: "22px", color: "#7F8F7A" }}>
          Riyadh, Saudi Arabia
        </div>
      </div>
    </div>,
    { ...size }
  );
}
