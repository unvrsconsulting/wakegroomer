import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f6e5f 0%, #0a4f44 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 96, marginBottom: 16 }}>🐾</div>
        <div style={{ fontSize: 64, fontWeight: 700, color: "white", textAlign: "center" }}>
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 32, color: "#e6f2ef", marginTop: 16, textAlign: "center" }}>
          Find a Mobile Dog Groomer in the NC Piedmont
        </div>
      </div>
    ),
    { ...size }
  );
}
