"use client";

import { useTransform, type MotionValue, motion } from "framer-motion";

type Props = {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  videoSrc?: string;
};

/** Soft gradient orbs; spring values are already capped in Hero (~±14px). k multiplies for sub-pixel parallax. */
function SoftOrb({
  springX,
  springY,
  k,
  className,
}: {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  k: number;
  className: string;
}) {
  const tx = useTransform(springX, (v) => v * k);
  const ty = useTransform(springY, (v) => v * k);
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{ x: tx, y: ty }}
    />
  );
}

export default function CinematicHeroBackground({
  springX,
  springY,
  videoSrc,
}: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#fafafa]">
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}

      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,hsl(0_0%_99%)_0%,hsl(262_40%_98%)_45%,hsl(0_0%_99%)_100%)]"
        aria-hidden
      />

      <SoftOrb
        springX={springX}
        springY={springY}
        k={0.85}
        className="-left-20 top-1/4 h-72 w-72 bg-violet-200/50 md:h-96 md:w-96"
      />
      <SoftOrb
        springX={springX}
        springY={springY}
        k={1.1}
        className="right-0 top-1/3 h-64 w-64 bg-indigo-100/60 md:h-80 md:w-80"
      />
      <SoftOrb
        springX={springX}
        springY={springY}
        k={0.65}
        className="left-1/3 bottom-0 h-56 w-56 -translate-x-1/2 bg-fuchsia-100/35"
      />

      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
    </div>
  );
}
