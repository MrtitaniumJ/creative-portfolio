"use client";

export default function AmbientLayer() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
    >
      <div className="absolute -left-1/3 top-0 h-[70vh] w-[70vh] rounded-full bg-violet-200/35 blur-[100px] dark:bg-violet-600/15" />
      <div className="absolute -right-1/4 bottom-0 h-[60vh] w-[60vh] rounded-full bg-indigo-200/30 blur-[110px] dark:bg-indigo-600/12" />
      <div className="absolute left-1/2 top-1/3 h-[40vh] w-[40vh] -translate-x-1/2 rounded-full bg-fuchsia-100/25 blur-[90px] dark:bg-fuchsia-600/10" />
    </div>
  );
}
