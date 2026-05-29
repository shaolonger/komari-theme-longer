import React, { useEffect, useRef } from "react";
import { useLiveData } from "../../contexts/LiveDataContext";
import { usePublicInfo } from "../../contexts/PublicInfoContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
}

export const NebulaBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { live_data } = useLiveData();
  const { publicInfo } = usePublicInfo();
  const settings = publicInfo?.theme_settings;

  // Get custom config settings
  const isEnabled = settings?.["customAppearance.enabled"] !== false;
  const isParticlesEnabled = settings?.["customBackground.nebulaParticles"] !== false;
  const customBgUrl = settings?.["customBackground.imageUrl"] || "";

  // Calculate total traffic (upload + download) in Megabytes
  const totalTrafficMB = React.useMemo(() => {
    if (!live_data?.data?.data) return 0;
    let totalBytesSec = 0;
    for (const node of Object.values(live_data.data.data)) {
      totalBytesSec += (node.network?.up || 0) + (node.network?.down || 0);
    }
    return totalBytesSec / (1024 * 1024); // Convert to MB/s
  }, [live_data]);

  // Keep track of speed multiplier based on live traffic
  const speedRef = useRef(1);
  useEffect(() => {
    // Standard server traffic maps to speed multiplier (1x to 4x)
    const baseSpeed = 1;
    const trafficAddition = Math.min(3, totalTrafficMB / 20); // Max 3x added speed at 20MB/s traffic
    speedRef.current = baseSpeed + trafficAddition;
  }, [totalTrafficMB]);

  useEffect(() => {
    if (!isEnabled || !isParticlesEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = { x: -1000, y: -1000, radius: 150 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Create particles list
    const particles: Particle[] = [];
    const particleCount = Math.min(100, Math.floor((width * height) / 15000));

    const colors = [
      "rgba(0, 245, 212, ",  // Cyan
      "rgba(0, 180, 216, ",  // Light Blue
      "rgba(255, 0, 127, ",  // Hot Pink
      "rgba(147, 51, 234, ", // Purple
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + 1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: radius,
        baseRadius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const multiplier = speedRef.current;

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particles
        p.x += p.vx * multiplier;
        p.y += p.vy * multiplier;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction (repulsion)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Soft push away from mouse
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
          p.radius = p.baseRadius * (1 + force * 1.5);
        } else {
          // Return to base size smoothly
          p.radius += (p.baseRadius - p.radius) * 0.1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.shadowBlur = multiplier > 1.5 ? 12 : 0;
        ctx.shadowColor = p.color + "1)";
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);

          if (ldist < 100) {
            const lineAlpha = (100 - ldist) / 100 * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha * (multiplier * 0.7)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled, isParticlesEnabled]);

  if (!isEnabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        background: customBgUrl
          ? `url(${customBgUrl}) no-repeat center center`
          : "radial-gradient(circle at 50% 50%, #0d0b21 0%, #04020a 100%)",
        backgroundSize: "cover",
        backgroundAttachment: settings?.["customBackground.fixed"] !== false ? "fixed" : "scroll",
      }}
    >
      {/* Dynamic particles overlay */}
      {isParticlesEnabled && (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      )}
      {/* Sci-Fi glowing grid mesh overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(rgba(18, 16, 35, 0) 97%, rgba(139, 92, 246, 0.03) 97%), linear-gradient(90deg, rgba(18, 16, 35, 0) 97%, rgba(139, 92, 246, 0.03) 97%)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
