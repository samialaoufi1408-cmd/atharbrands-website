import { ImageResponse } from "next/og";

export const alt = "أثر | ATHAR Branding Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F6F4F1",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", fontSize: "40px", letterSpacing: "20px", color: "#7B6D8D", fontWeight: 600 }}>
            ATHAR
          </div>
          <div style={{ display: "flex", fontSize: "20px", letterSpacing: "10px", color: "#8A8395" }}>
            BRANDING STUDIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: "90px", height: "4px", background: "#B89CAC", marginBottom: "28px" }} />
          <div style={{ display: "flex", fontSize: "70px", color: "#4E4A53", fontWeight: 600, lineHeight: 1.15 }}>
            We create brands that are
          </div>
          <div style={{ display: "flex", fontSize: "70px", color: "#7B6D8D", fontWeight: 600, lineHeight: 1.15 }}>
            seen, and remembered.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: "26px", color: "#7B6D8D" }}>atharbrands.com</div>
          <div style={{ display: "flex", fontSize: "22px", color: "#8A8395" }}>Riyadh, Saudi Arabia</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
