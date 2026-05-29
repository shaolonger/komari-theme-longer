import React, { useMemo } from "react";
import { Card, Flex, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { Activity, HardDrive, Cpu, MemoryStick, Clock, Zap, ArrowUp, ArrowDown } from "lucide-react";
import type { NodeBasicInfo } from "@/contexts/NodeListContext";
import type { Record } from "@/types/LiveData";
import { formatUptime } from "./Node";
import { formatBytes, getTrafficStats } from "@/utils";
import { GlowRing } from "./ui/GlowRing";
import { LiveSparkline } from "./ui/LiveSparkline";
import "./NodeModernCard.css";

interface ModernCardDynamicProps {
  basic: NodeBasicInfo;
  live: Record | undefined;
  online: boolean;
  forceShowTrafficText?: boolean;
  children: React.ReactNode; // 静态内容插槽
}

const ModernCardDynamicComponent: React.FC<ModernCardDynamicProps> = ({ 
  basic, 
  live, 
  online, 
  forceShowTrafficText: _forceShowTrafficText = false,
  children
}) => {
  const { t } = useTranslation();

  // 默认值
  const defaultLive: Record = {
    cpu: { usage: 0 },
    ram: { used: 0 },
    swap: { used: 0 },
    load: { load1: 0, load5: 0, load15: 0 },
    disk: { used: 0 },
    network: { up: 0, down: 0, totalUp: 0, totalDown: 0 },
    connections: { tcp: 0, udp: 0 },
    uptime: 0,
    process: 0,
    message: "",
    updated_at: ""
  };

  const liveData = live || defaultLive;

  // 直接计算使用率百分比
  const memoryPercent = basic.mem_total ? (liveData.ram.used / basic.mem_total) * 100 : 0;
  const diskPercent = basic.disk_total ? (liveData.disk.used / basic.disk_total) * 100 : 0;

  // 使用缓存的流量计算
  const trafficStats = getTrafficStats(
    liveData.network.totalUp,
    liveData.network.totalDown,
    basic.traffic_limit,
    basic.traffic_limit_type
  );
  const trafficPercentage = trafficStats.percentage;
  const trafficUsage = trafficStats.usage;

  // 缓存静态的格式化值
  const staticFormattedBytes = useMemo(() => ({
    ramTotal: formatBytes(basic.mem_total, false, 1),
    ramTotalCompact: formatBytes(basic.mem_total, true),
    diskTotal: formatBytes(basic.disk_total, false, 1),
    diskTotalCompact: formatBytes(basic.disk_total, true),
    trafficLimit: formatBytes(basic.traffic_limit || 0, false, 1),
    trafficLimitCompact: formatBytes(basic.traffic_limit || 0, true)
  }), [basic.mem_total, basic.disk_total, basic.traffic_limit]);

  // 获取状态发光颜色类别
  const getNebulaGlowClass = () => {
    if (!online) return "node-card-offline";
    if (liveData.cpu.usage > 90 || memoryPercent > 90) return "nebula-glow-danger";
    if (liveData.cpu.usage > 70 || memoryPercent > 70) return "nebula-glow-warning";
    return "nebula-glow-online";
  };

  // 动态色表
  const colors = {
    cpu: liveData.cpu.usage > 90 ? "#ef4444" : liveData.cpu.usage > 70 ? "#f59e0b" : "#00f5d4",
    ram: memoryPercent > 90 ? "#ef4444" : memoryPercent > 70 ? "#f59e0b" : "#00b4d8",
    disk: diskPercent > 90 ? "#ef4444" : diskPercent > 70 ? "#f59e0b" : "#a855f7"
  };

  return (
    <Card
      className={`
        nebula-glass ${getNebulaGlowClass()}
        relative overflow-visible
        cursor-pointer
        h-full min-h-fit
      `}
      style={{
        transform: 'scale(1)',
        transformOrigin: 'center'
      }}
    >
      {/* Glow Status Strip */}
      <div 
        className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-xl ${
          online 
            ? liveData.cpu.usage > 90 || memoryPercent > 90
              ? 'bg-gradient-to-r from-red-500 via-rose-500 to-red-500'
              : liveData.cpu.usage > 70 || memoryPercent > 70
                ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500'
                : 'bg-gradient-to-r from-[#00f5d4] via-[#00b4d8] to-[#00f5d4]' 
            : 'bg-gray-500'
        }`}
        style={{
          boxShadow: online 
            ? liveData.cpu.usage > 90 || memoryPercent > 90
              ? '0 0 12px rgba(239, 68, 68, 0.6)'
              : '0 0 12px rgba(0, 245, 212, 0.6)'
            : 'none'
        }}
      />

      {/* Main Body */}
      <Flex direction="column" gap="3" className="p-3 sm:p-4 relative z-10">
        {/* Static Slot (Card Header) */}
        {children}

        {/* Dynamic Scientific Resource Rings Grid */}
        <div className="grid grid-cols-3 gap-2 min-w-0">
          <GlowRing
            value={liveData.cpu.usage}
            glowColor={colors.cpu}
            label="CPU"
            subLabel={basic.cpu_cores ? `${basic.cpu_cores} Cores` : "Active"}
            icon={<Cpu size={12} />}
          />
          <GlowRing
            value={memoryPercent}
            glowColor={colors.ram}
            label="RAM"
            subLabel={`${formatBytes(liveData.ram.used, true)}/${staticFormattedBytes.ramTotalCompact}`}
            icon={<MemoryStick size={12} />}
          />
          <GlowRing
            value={diskPercent}
            glowColor={colors.disk}
            label="Disk"
            subLabel={`${formatBytes(liveData.disk.used, true)}/${staticFormattedBytes.diskTotalCompact}`}
            icon={<HardDrive size={12} />}
          />
        </div>

        {/* Live Sparkline Bandwidth Wave Component */}
        {online && (
          <LiveSparkline
            uploadSpeed={liveData.network.up}
            downloadSpeed={liveData.network.down}
            height={38}
          />
        )}

        {/* Dynamic Network Traffic Details */}
        <div className="flex flex-col gap-1 text-[11px] font-mono-numbers text-muted-foreground/80 bg-accent-2/5 p-2 rounded-lg border border-accent-4/30">
          {Number(basic.traffic_limit) > 0 && basic.traffic_limit_type ? (
            <Flex justify="between" align="center" className="min-w-0">
              <span className="flex-shrink-0">Limit Traffic:</span>
              <span className="font-bold truncate text-foreground">
                {formatBytes(trafficUsage, true)} / {staticFormattedBytes.trafficLimitCompact} ({trafficPercentage.toFixed(1)}%)
              </span>
            </Flex>
          ) : (
            <Flex justify="between" align="center" className="min-w-0">
              <span className="flex-shrink-0">Accumulated Traffic:</span>
              <span className="font-bold truncate text-foreground">
                ↑ {formatBytes(liveData.network.totalUp, true)} | ↓ {formatBytes(liveData.network.totalDown, true)}
              </span>
            </Flex>
          )}

          {online && (
            <Flex justify="between" align="center" className="min-w-0 border-t border-accent-4/20 pt-1 mt-1">
              <span className="flex items-center text-green-500 font-bold truncate">
                <ArrowUp size={11} className="mr-0.5" />
                {formatBytes(liveData.network.up, true)}/s
              </span>
              <span className="flex items-center text-violet-500 font-bold truncate">
                <ArrowDown size={11} className="mr-0.5" />
                {formatBytes(liveData.network.down, true)}/s
              </span>
            </Flex>
          )}
        </div>

        {/* Card Footer */}
        <Flex justify="between" align="center" className="pt-2 border-t border-accent-4/30 text-[11px]">
          <Flex gap="1" align="center" className="min-w-0">
            <Clock size={11} className="text-muted-foreground flex-shrink-0" />
            <Text color="gray" className="truncate font-mono-numbers">
              {online ? formatUptime(liveData.uptime, t) : t("nodeCard.offline")}
            </Text>
          </Flex>

          {online && (
            <Flex gap="2" align="center" className="flex-shrink-0">
              <Flex gap="1" align="center" className="min-w-0">
                <Zap size={11} className="text-yellow-500 flex-shrink-0" />
                <Text color="gray" className="font-mono-numbers">
                  L: {liveData.load?.load1?.toFixed(2) || "0.00"}
                </Text>
              </Flex>
              <Flex gap="1" align="center" className="flex-shrink-0 bg-green-500/10 rounded px-1 py-0.5 border border-green-500/20">
                <Activity size={10} className="text-green-500 neon-pulse-dot" />
                <Text className="text-green-500 font-bold uppercase tracking-wider text-[9px] leading-none">
                  Live
                </Text>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};

// Memoized custom component comparison
export const ModernCardDynamic = React.memo(ModernCardDynamicComponent, (prev, next) => {
  if (prev.basic.uuid !== next.basic.uuid) return false;
  if (prev.basic.mem_total !== next.basic.mem_total) return false;
  if (prev.basic.disk_total !== next.basic.disk_total) return false;
  if (prev.basic.traffic_limit !== next.basic.traffic_limit) return false;
  if (prev.basic.traffic_limit_type !== next.basic.traffic_limit_type) return false;
  if (prev.basic.cpu_cores !== next.basic.cpu_cores) return false;
  if (prev.online !== next.online) return false;
  if (prev.forceShowTrafficText !== next.forceShowTrafficText) return false;
  
  if (!prev.live && !next.live) return true;
  if (!prev.live || !next.live) return false;
  
  const prevLive = prev.live;
  const nextLive = next.live;
  
  return (
    prevLive.cpu.usage === nextLive.cpu.usage &&
    prevLive.ram.used === nextLive.ram.used &&
    prevLive.disk.used === nextLive.disk.used &&
    prevLive.network.up === nextLive.network.up &&
    prevLive.network.down === nextLive.network.down &&
    prevLive.network.totalUp === nextLive.network.totalUp &&
    prevLive.network.totalDown === nextLive.network.totalDown &&
    prevLive.load.load1 === nextLive.load.load1 &&
    prevLive.uptime === nextLive.uptime &&
    prevLive.message === nextLive.message
  );
});