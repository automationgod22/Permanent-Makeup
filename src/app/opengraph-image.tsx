import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "pm_usa77: permanent makeup and SMP in Jersey City";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const italiana = await readFile(join(process.cwd(), "src/app/fonts/italiana-latin-400-normal.woff"));

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#2a1d24",
          color: "#f2e4dc",
          padding: "72px 80px",
          fontFamily: "Italiana",
        }}
      >
        <svg width="640" height="200" viewBox="40 60 560 170">
          <path d="M104 34 V326 M402 34 V326 M560 34 V326 M40 104 H612 M40 212 H612" stroke="#d24e63" strokeWidth="1.5" />
          <path
            d="M104 206 C98 184 114 168 150 161 C232 146 330 121 402 106 C452 97 512 114 560 152 C510 140 452 136 406 144 C330 157 232 181 160 201 C130 209 108 214 104 206 Z"
            fill="#9c786b"
          />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1 }}>pm_usa77</div>
          <div style={{ fontSize: 44, marginTop: 18, color: "#c98b83" }}>Permanent makeup and SMP, Jersey City</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Italiana", data: italiana, weight: 400, style: "normal" }] },
  );
}
