import { useTranslation } from "react-i18next";
import {
  CalendarClock,
  Cpu,
  Gauge,
  HardDrive,
  MemoryStick,
  Network,
  Tags,
} from "lucide-react";
import { formatBytes, formatUptime } from "./Node";
import { getTrafficStats } from "@/utils";
import type { NodeBasicInfo } from "@/contexts/NodeListContext";
import type { Record } from "@/types/LiveData";
import { MetricBar } from "./MetricBar";
import { TrafficLimitChart } from "./TrafficLimitChart";
import { usePingSummary } from "@/hooks/use-ping-summary";

interface DesktopDetailsCardProps {
  node: NodeBasicInfo;
  liveData?: Record;
}

type ResourceTone = "cpu" | "memory" | "disk" | "network" | "swap" | "asset";

const buildSparkBars = (seed: number) =>
  Array.from({ length: 20 }, (_, index) => {
    const raw = Math.abs(Math.sin(seed / 9 + index * 0.63)) * 100;
    return 16 + (raw % 30);
  });

const getDaysUntil = (expiredAt?: string) => {
  if (!expiredAt) return null;
  const time = new Date(expiredAt).getTime();
  if (Number.isNaN(time)) return null;
  return Math.ceil((time - Date.now()) / (1000 * 60 * 60 * 24));
};

const ResourceCard = ({
  title,
  icon,
  primary,
  secondary,
  footerLeft,
  footerRight,
  tone,
  barValue,
  sparkSeed,
}: {
  title: string;
  icon: React.ReactNode;
  primary: React.ReactNode;
  secondary: React.ReactNode;
  footerLeft?: React.ReactNode;
  footerRight?: React.ReactNode;
  tone: ResourceTone;
  barValue?: number;
  sparkSeed: number;
}) => {
  const sparkBars = buildSparkBars(sparkSeed);

  return (
    <section className={`node-detail-resource-card is-${tone}`}>
      <div className="node-detail-resource-head">
        <div className="node-detail-resource-icon">{icon}</div>
        <div className="node-detail-resource-title">{title}</div>
      </div>

      <div className="node-detail-resource-primary">{primary}</div>
      <div className="node-detail-resource-secondary">{secondary}</div>

      <div className="node-detail-resource-spark" aria-hidden="true">
        {sparkBars.map((height, index) => (
          <span key={`${title}-${index}`} style={{ height }} />
        ))}
      </div>

      {typeof barValue === "number" ? <MetricBar value={barValue} /> : <div className="node-detail-resource-divider" />}

      {(footerLeft || footerRight) && (
        <div className="node-detail-resource-footer">
          <span>{footerLeft}</span>
          <span>{footerRight}</span>
        </div>
      )}
    </section>
  );
};

const SummaryItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="node-detail-summary-item">
    <span className="node-detail-summary-label">{label}</span>
    <span className="node-detail-summary-value">{value}</span>
  </div>
);

export const DesktopDetailsCard: React.FC<DesktopDetailsCardProps> = ({
  node,
  liveData,
}) => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.resolvedLanguage?.toLowerCase().startsWith("zh");
  const copy = (zh: string, en: string) => (isZh ? zh : en);
  const cpuUsage = liveData?.cpu.usage ?? 0;
  const memoryUsagePercent = node.mem_total && liveData ? (liveData.ram.used / node.mem_total) * 100 : 0;
  const diskUsagePercent = node.disk_total && liveData ? (liveData.disk.used / node.disk_total) * 100 : 0;
  const swapUsagePercent = node.swap_total && liveData ? (liveData.swap.used / node.swap_total) * 100 : 0;
  const hasTrafficLimit = Number(node.traffic_limit) > 0 && node.traffic_limit_type;
  const trafficStats = liveData
    ? getTrafficStats(
        liveData.network.totalUp,
        liveData.network.totalDown,
        node.traffic_limit,
        node.traffic_limit_type
      )
    : { percentage: 0, usage: 0 };
  const pingSummary = usePingSummary(node.uuid);
  const expiryDays = getDaysUntil(node.expired_at);
  const hasGpuInfo = Boolean(node.gpu_name && node.gpu_name !== "Unknown");
  const priceLabel = node.price > 0 ? `${node.currency || "$"}${node.price.toFixed(2)}` : copy("未设置", "Unset");
  const billingLabel = node.billing_cycle > 0 ? copy(`${node.billing_cycle} 天`, `${node.billing_cycle} days`) : copy("未设置", "Unset");
  const expiryLabel =
    expiryDays === null
      ? copy("未设置", "Unset")
      : expiryDays >= 0
        ? copy(`${expiryDays} 天`, `${expiryDays} days`)
        : copy("已过期", "Expired");
  const tagList = (node.tags || "")
    .split(/[，,\s]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
  const groupLabel = node.group || copy("未分组", "Ungrouped");
  const networkTotal = liveData ? liveData.network.totalUp + liveData.network.totalDown : 0;
  const networkBarValue = Math.min(
    100,
    Math.max(0, (((liveData?.network.up || 0) + (liveData?.network.down || 0)) / 125000000) * 100)
  );
  const latencyHighlights = pingSummary.items.slice(0, 3);

  const resourceCards = [
    {
      title: t("nodeCard.cpu"),
      icon: <Cpu size={18} />,
      primary: `${cpuUsage.toFixed(0)}%`,
      secondary: copy("实时占用", "Utilization"),
      footerLeft: `${node.cpu_cores} ${copy("核", "cores")}`,
      footerRight: `1m ${liveData?.load?.load1?.toFixed(2) ?? "-"}`,
      tone: "cpu" as const,
      barValue: cpuUsage,
      sparkSeed: cpuUsage + 11,
    },
    {
      title: t("nodeCard.ram"),
      icon: <MemoryStick size={18} />,
      primary: `${memoryUsagePercent.toFixed(0)}%`,
      secondary: `${formatBytes(liveData?.ram.used || 0)} / ${formatBytes(node.mem_total)}`,
      footerLeft: copy("已用", "Used"),
      footerRight: formatBytes(liveData?.ram.used || 0),
      tone: "memory" as const,
      barValue: memoryUsagePercent,
      sparkSeed: memoryUsagePercent + 29,
    },
    {
      title: t("nodeCard.disk"),
      icon: <HardDrive size={18} />,
      primary: `${diskUsagePercent.toFixed(0)}%`,
      secondary: `${formatBytes(liveData?.disk.used || 0)} / ${formatBytes(node.disk_total)}`,
      footerLeft: copy("挂载点", "Mount"),
      footerRight: "/",
      tone: "disk" as const,
      barValue: diskUsagePercent,
      sparkSeed: diskUsagePercent + 47,
    },
    {
      title: t("nodeCard.networkSpeed"),
      icon: <Network size={18} />,
      primary: (
        <div className="node-detail-network-primary">
          <span>↓ {formatBytes(liveData?.network.down || 0)}/s</span>
          <span>↑ {formatBytes(liveData?.network.up || 0)}/s</span>
        </div>
      ),
      secondary: copy("实时入站 / 出站", "Realtime ingress / egress"),
      footerLeft: copy("累计流量", "Total traffic"),
      footerRight: formatBytes(networkTotal),
      tone: "network" as const,
      barValue: networkBarValue,
      sparkSeed: networkTotal / 1024 / 1024 + 73,
    },
    {
      title: t("nodeCard.swap"),
      icon: <Gauge size={18} />,
      primary: `${swapUsagePercent.toFixed(0)}%`,
      secondary: `${formatBytes(liveData?.swap.used || 0)} / ${formatBytes(node.swap_total || 0)}`,
      footerLeft: copy("进程数", "Processes"),
      footerRight: `${liveData?.process || 0}`,
      tone: "swap" as const,
      barValue: swapUsagePercent,
      sparkSeed: swapUsagePercent + 97,
    },
    {
      title: hasGpuInfo ? copy("GPU", "GPU") : copy("流量上限", "Traffic Cap"),
      icon: hasGpuInfo ? <Tags size={18} /> : <CalendarClock size={18} />,
      primary: hasGpuInfo ? (node.gpu_name || "-") : hasTrafficLimit ? `${trafficStats.percentage.toFixed(0)}%` : copy("无限制", "Unlimited"),
      secondary: hasGpuInfo
        ? node.gpu_mem_total
          ? `${formatBytes(node.gpu_mem_total)} VRAM`
          : copy("显卡信息已识别", "GPU detected")
        : hasTrafficLimit
          ? `${formatBytes(trafficStats.usage)} / ${formatBytes(node.traffic_limit || 0)}`
          : copy("当前节点未设置流量限制", "No traffic limit configured"),
      footerLeft: hasGpuInfo ? copy("硬件加速", "Acceleration") : copy("周期", "Cycle"),
      footerRight: hasGpuInfo ? copy("可用", "Available") : node.traffic_limit_type || "-",
      tone: "asset" as const,
      barValue: hasGpuInfo ? undefined : hasTrafficLimit ? trafficStats.percentage : undefined,
      sparkSeed: (hasGpuInfo ? node.gpu_mem_total || 64 : trafficStats.percentage) + 121,
    },
  ];

  return (
    <div className="node-detail-body">
      <div className="node-detail-resource-grid">
        {resourceCards.map((card) => (
          <ResourceCard key={card.title} {...card} />
        ))}
      </div>

      <div className="node-detail-summary-grid">
        <section className="node-detail-summary-card node-detail-animate" style={{ ["--delay" as any]: "160ms" }}>
          <div className="node-detail-summary-header">
            <div className="node-detail-section-title">{copy("实例快照", "Instance Snapshot")}</div>
          </div>
          <div className="node-detail-summary-items">
            <SummaryItem label={t("nodeCard.os")} value={node.os} />
            <SummaryItem label={t("nodeCard.kernelVersion")} value={node.kernel_version || "-"} />
            <SummaryItem label={t("nodeCard.arch")} value={node.arch} />
            <SummaryItem label={t("nodeCard.virtualization")} value={node.virtualization || "-"} />
            <SummaryItem label={t("nodeCard.uptime")} value={liveData?.uptime ? formatUptime(liveData.uptime, t) : "-"} />
            <SummaryItem label={t("nodeCard.last_updated")} value={liveData?.updated_at ? new Date(liveData.updated_at).toLocaleString() : "-"} />
          </div>
        </section>

        <section className="node-detail-summary-card node-detail-animate" style={{ ["--delay" as any]: "200ms" }}>
          <div className="node-detail-summary-header">
            <div className="node-detail-section-title">{copy("监控摘要", "Monitoring Summary")}</div>
          </div>
          <div className="node-detail-summary-items">
            <SummaryItem
              label={copy("连接数", "Connections")}
              value={liveData ? `TCP ${liveData.connections.tcp} / UDP ${liveData.connections.udp}` : "-"}
            />
            <SummaryItem label={copy("总流量", "Total Traffic")} value={formatBytes(networkTotal)} />
            <SummaryItem
              label={copy("负载均值", "Load Average")}
              value={`1m ${liveData?.load?.load1?.toFixed(2) ?? "-"} / 5m ${liveData?.load?.load5?.toFixed(2) ?? "-"}`}
            />
          </div>

          <div className="node-detail-latency-list compact">
            {latencyHighlights.length > 0 ? (
              latencyHighlights.map((item) => (
                <div key={item.name} className="node-detail-latency-compact-row">
                  <span>{item.name}</span>
                  <span>{item.current == null ? "-" : `${Math.round(item.current)} ms`}</span>
                </div>
              ))
            ) : (
              <div className="node-detail-latency-compact-row">
                <span>{copy("暂无 Ping 摘要", "No ping summary yet")}</span>
                <span>-</span>
              </div>
            )}
          </div>
        </section>

        <section className="node-detail-summary-card node-detail-animate" style={{ ["--delay" as any]: "240ms" }}>
          <div className="node-detail-summary-header">
            <div className="node-detail-section-title">{copy("资产与生命周期", "Asset & Lifecycle")}</div>
          </div>
          <div className="node-detail-summary-items">
            <SummaryItem label={copy("价格", "Price")} value={priceLabel} />
            <SummaryItem label={copy("账期", "Billing")} value={billingLabel} />
            <SummaryItem label={copy("到期", "Expiration")} value={expiryLabel} />
            <SummaryItem label={copy("分组", "Group")} value={groupLabel} />
          </div>

          {hasTrafficLimit ? (
            <TrafficLimitChart
              label={t("nodeCard.trafficLimit")}
              type={node.traffic_limit_type}
              percentage={trafficStats.percentage}
              usedLabel={formatBytes(trafficStats.usage)}
              limitLabel={formatBytes(node.traffic_limit || 0)}
            />
          ) : (
            <div className="node-detail-summary-empty">{copy("当前节点未设置流量限制", "No traffic limit configured")}</div>
          )}

          <div className="node-detail-tag-list">
            <span className="node-detail-tag-title">
              <Tags size={14} />
              {copy("标签", "Tags")}
            </span>
            <div className="node-detail-tag-pills">
              {tagList.length > 0 ? (
                tagList.map((tag) => <span key={tag} className="node-detail-tag-pill">{tag}</span>)
              ) : (
                <span className="node-detail-tag-empty">{copy("暂无标签", "No tags")}</span>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};