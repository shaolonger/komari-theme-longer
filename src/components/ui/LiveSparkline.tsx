import React, { useEffect, useRef } from "react";

interface LiveSparklineProps {
  uploadSpeed: number; // bytes/sec
  downloadSpeed: number; // bytes/sec
  height?: number;
}

export const LiveSparkline: React.FC<LiveSparklineProps> = ({
  uploadSpeed,
  downloadSpeed,
  height = 36
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keep speed history (up to 40 data points)
  const uploadHistory = useRef<number[]>(Array(40).fill(0));
  const downloadHistory = useRef<number[]>(Array(40).fill(0));

  useEffect(() => {
    // Append new speeds to history
    uploadHistory.current.push(uploadSpeed);
    downloadHistory.current.push(downloadSpeed);

    // Limit history length
    if (uploadHistory.current.length > 40) uploadHistory.current.shift();
    if (downloadHistory.current.length > 40) downloadHistory.current.shift();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI screens
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = height;

    ctx.clearRect(0, 0, w, h);

    // Find the maximum value to scale charts correctly
    const maxVal = Math.max(
      1024 * 10, // Min scale limit (10 KB/s) to prevent flatlines on empty networks
      ...uploadHistory.current,
      ...downloadHistory.current
    );

    const pointsCount = uploadHistory.current.length;
    const step = w / (pointsCount - 1);

    const drawPath = (history: number[], strokeColor: string, fillColor: string) => {
      if (history.length === 0) return;

      ctx.beginPath();
      ctx.moveTo(0, h);

      for (let i = 0; i < history.length; i++) {
        const x = i * step;
        const y = h - (history[i] / maxVal) * (h - 4) - 2; // leave 2px padding at top and bottom
        ctx.lineTo(x, y);
      }

      ctx.lineTo(w, h);
      ctx.closePath();

      // Create neon gradient fill
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, fillColor);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.fill();

      // Draw stroke path
      ctx.beginPath();
      for (let i = 0; i < history.length; i++) {
        const x = i * step;
        const y = h - (history[i] / maxVal) * (h - 4) - 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 4;
      ctx.shadowColor = strokeColor;
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow
    };

    // Draw Upload Waveform (Cyan/Emerald)
    drawPath(
      uploadHistory.current,
      "rgba(16, 185, 129, 1)", // Emerald
      "rgba(16, 185, 129, 0.15)"
    );

    // Draw Download Waveform (Purple/Blue)
    drawPath(
      downloadHistory.current,
      "rgba(139, 92, 246, 1)", // Purple
      "rgba(139, 92, 246, 0.15)"
    );

  }, [uploadSpeed, downloadSpeed, height]);

  return (
    <div className="relative w-full flex flex-col gap-1 mt-1 bg-accent-2/15 rounded-lg p-1.5 border border-accent-4">
      <div className="flex justify-between items-center px-1">
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
          Real-time Bandwidth Wave
        </span>
        <div className="flex gap-2">
          <span className="flex items-center text-[9px] font-bold text-green-500 font-mono-numbers">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 animate-pulse" />
            TX
          </span>
          <span className="flex items-center text-[9px] font-bold text-violet-500 font-mono-numbers">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mr-1 animate-pulse" />
            RX
          </span>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: `${height}px`,
          display: "block"
        }}
      />
    </div>
  );
};
