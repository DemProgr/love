import type { CSSProperties } from "react";

export type PhotoTone = "gray" | "warm" | "sepia" | "deep";

interface PhotoProps {
  seed?: number;
  tone?: PhotoTone;
  label?: string;
  className?: string;
  style?: CSSProperties;
  src?: string;
  eager?: boolean;
}

const grayPalettes = [
  ["#dcd9d5", "#8b8783", "#2b2927"],
  ["#c4c1bd", "#6e6b68", "#1a1918"],
  ["#e6e3df", "#98948f", "#33302e"],
  ["#b0ada9", "#5c5955", "#141312"],
];

const warmPalettes = [
  ["#f2ded0", "#bd8477", "#4d1421"],
  ["#eed4c1", "#ac7279", "#450f1e"],
  ["#f6e9dc", "#d3a08b", "#671a2b"],
  ["#e4cabd", "#a06573", "#3a0d18"],
];

const sepiaPalettes = [
  ["#e6d8c3", "#a98f6c", "#44362a"],
  ["#dbcbb0", "#8b7053", "#2f251b"],
  ["#efe4d1", "#bb9f79", "#523e2f"],
  ["#cfbc9e", "#806a52", "#261e17"],
];

const deepPalettes = [
  ["#bcb8b4", "#5e5b58", "#0f0e0d"],
  ["#a8a4a0", "#4e4b49", "#0c0b0a"],
  ["#c7c3bf", "#6a6764", "#121110"],
  ["#9a9692", "#413f3d", "#0a0a09"],
];

function pick(tone: PhotoTone, seed: number) {
  const index = Math.abs(seed) % 4;
  if (tone === "warm") return warmPalettes[index];
  if (tone === "sepia") return sepiaPalettes[index];
  if (tone === "deep") return deepPalettes[index];
  return grayPalettes[index];
}

export default function Photo({
  seed = 1,
  tone = "gray",
  label,
  className = "",
  style,
  src,
  eager = false,
}: PhotoProps) {
  const [light, mid, dark] = pick(tone, seed);
  const x1 = 22 + ((seed * 17) % 40);
  const y1 = 18 + ((seed * 29) % 34);
  const x2 = 55 + ((seed * 13) % 35);

  const background = [
    `radial-gradient(ellipse 42% 36% at ${x1}% ${y1}%, ${light} 0%, transparent 72%)`,
    `radial-gradient(ellipse 50% 45% at ${x2}% 82%, ${mid} 0%, transparent 78%)`,
    `radial-gradient(ellipse 60% 55% at 45% 45%, ${mid} 0%, transparent 85%)`,
    `linear-gradient(158deg, ${mid} 0%, ${dark} 100%)`,
  ].join(", ");

  return (
    <div
      className={`photo photo--${tone} ${className}`}
      style={{ background, ...style }}
      role="img"
      aria-label={label}
    >
      {src ? (
        <img
          className="photo__img"
          src={src}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      ) : null}
    </div>
  );
}
