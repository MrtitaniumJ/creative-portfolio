import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Jatin Sharma | Full-stack engineer & builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 45%, #7c3aed 100%)",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Jatin Sharma
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 28,
            color: "rgba(255,255,255,0.9)",
            fontWeight: 500,
          }}
        >
          Full-stack engineer · products, mentorship, calm craft
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 20,
            color: "rgba(255,255,255,0.75)",
            maxWidth: 720,
          }}
        >
          I build things people actually use—from first sketch to the details that survive real traffic.
        </div>
      </div>
    ),
    { ...size }
  );
}
