"use client";

interface GradientBackgroundProps {
  orb1?: string;
  orb2?: string;
  orb3?: string;
}

export function GradientBackground({
  orb1 = "#3e3ff0",
  orb2 = "#ff00e5",
  orb3 = "#201881",
}: GradientBackgroundProps) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full opacity-30 blur-[120px] animate-pulse-glow"
        style={{ background: `radial-gradient(circle, ${orb1} 0%, transparent 70%)` }}
      />
      <div
        className="absolute -right-1/4 top-1/3 h-[500px] w-[500px] rounded-full opacity-25 blur-[100px] animate-pulse-glow"
        style={{
          background: `radial-gradient(circle, ${orb2} 0%, transparent 70%)`,
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute -bottom-1/4 left-1/3 h-[550px] w-[550px] rounded-full opacity-20 blur-[110px] animate-pulse-glow"
        style={{
          background: `radial-gradient(circle, ${orb3} 0%, transparent 70%)`,
          animationDelay: "4s",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
