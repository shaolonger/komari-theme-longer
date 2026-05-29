import React from "react";

interface GlowRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  glowColor: string;
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
}

export const GlowRing: React.FC<GlowRingProps> = ({
  value,
  size = 64,
  strokeWidth = 5,
  glowColor,
  label,
  subLabel = "",
  icon
}) => {
  const percent = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-1 bg-accent-2/10 rounded-xl border border-accent-4 hover:bg-accent-2/25 transition-all duration-300 min-w-0">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow Shadow effect layer */}
        <svg
          className="absolute inset-0 pointer-events-none filter blur-[4px] opacity-75"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={glowColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Base Track */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Glowing Active Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={glowColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          />
        </svg>

        {/* Central percentage & icon */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {icon && <span className="opacity-40 scale-75 mb-0.5">{icon}</span>}
          <span className="text-[11px] font-bold font-mono-numbers text-foreground leading-none">
            {percent.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Label under the ring */}
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-1.5 leading-none">
        {label}
      </span>
      {subLabel && (
        <span className="text-[9px] font-mono-numbers text-muted-foreground/60 mt-0.5 truncate max-w-full text-center leading-none">
          {subLabel}
        </span>
      )}
    </div>
  );
};
