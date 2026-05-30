import { Dialog, Button } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { Cpu, HardDrive, MemoryStick, Network, Tags } from "lucide-react";
import { formatBytes, formatUptime } from "./Node";
import { getTrafficStats } from "@/utils";
import type { NodeBasicInfo } from "@/contexts/NodeListContext";
import type { Record } from "@/types/LiveData";
import { useState } from "react";
import { MetricBar } from "./MetricBar";
import { TrafficLimitChart } from "./TrafficLimitChart";
import { usePingSummary } from "@/hooks/use-ping-summary";

interface MobileDetailsCardProps {
  node: NodeBasicInfo;
  liveData?: Record;
}

type MobileTone = "cpu" | "memory" | "disk" | "network";

const buildSparkBars = (seed: number) =>
  Array.from({ length: 16 }, (_, index) => {
    const raw = Math.abs(Math.sin(seed / 9 + index * 0.66)) * 100;
    return 16 + (raw % 26);
  });

const buildPingBars = (values: number[]) => {
  if (values.length === 0) {
    return Array.from({ length: 24 }, (_, index) => 18 + ((index * 7) % 12));
  }
  const safeMax = Math.max(...values, 1);
  return Array.from({ length: 24 }, (_, index) => {
    const sample = values[index % values.length] ?? 0;
    const normalized = Math.max(0, Math.min(1, sample / safeMax));
    return 12 + normalized * 34;
  });
};

const getDaysUntil = (expiredAt?: string) => {
  if (!expiredAt) return null;
  const time = new Date(expiredAt).getTime();
  if (Number.isNaN(time)) return null;
  return Math.ceil((time - Date.now()) / (1000 * 60 * 60 * 24));
};

const MobileResourceCard = ({
  title,
  icon,
  primary,
  secondary,
  footer,
  tone,
  barValue,
  sparkSeed,
}: {
  title: string;
  icon: React.ReactNode;
  primary: React.ReactNode;
  secondary: React.ReactNode;
  footer?: React.ReactNode;
  tone: MobileTone;
  barValue?: number;
  sparkSeed: number;
}) => {
  const sparkBars = buildSparkBars(sparkSeed);

  return (
    <section className={`node-detail-mobile-resource-card is-${tone}`}>
      <div className="node-detail-mobile-resource-head">
        <div className="node-detail-mobile-resource-icon">{icon}</div>
        <div className="node-detail-mobile-resource-title">{title}</div>
      </div>
      <div className="node-detail-mobile-resource-primary">{primary}</div>
      <div className="node-detail-mobile-resource-secondary">{secondary}</div>
      <div className="node-detail-mobile-resource-spark" aria-hidden="true">
        {sparkBars.map((height, index) => (
          <span key={`${title}-${index}`} style={{ height }} />
        ))}
      </div>
      {typeof barValue === "number" ? <MetricBar value={barValue} compact /> : <div className="node-detail-mobile-resource-divider" />}
      {footer && <div className="node-detail-mobile-resource-footer">{footer}</div>}
    </section>
  );
};

export const MobileDetailsCard: React.FC<MobileDetailsCardProps> = ({
  node,
  liveData,
}) => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.resolvedLanguage?.toLowerCase().startsWith("zh");
  const copy = (zh: string, en: string) => (isZh ? zh : en);
  const cpuUsage = liveData?.cpu.usage ?? 0;
  const memoryUsagePercent = node.mem_total && liveData ? (liveData.ram.used / node.mem_total) * 100 : 0;
  const diskUsagePercent = node.disk_total && liveData ? (liveData.disk.used / node.disk_total) * 100 : 0;
  const networkTotal = liveData ? liveData.network.totalUp + liveData.network.totalDown : 0;
  const networkBarValue = Math.min(
    100,
    Math.max(0, (((liveData?.network.up || 0) + (liveData?.network.down || 0)) / 125000000) * 100)
  );
  const trafficStats = liveData
    ? getTrafficStats(
        liveData.network.totalUp,
        liveData.network.totalDown,
        node.traffic_limit,
        node.traffic_limit_type
      )
    : { percentage: 0, usage: 0 };
  const hasTrafficLimit = Number(node.traffic_limit) > 0 && node.traffic_limit_type;
  const pingSummary = usePingSummary(node.uuid);
  const expiryDays = getDaysUntil(node.expired_at);
  const priceLabel = node.price > 0 ? `${node.currency || "$"}${node.price.toFixed(2)}` : copy("未设置", "Unset");
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
    .slice(0, 4);
  const [activePanel, setActivePanel] = useState<"snapshot" | "asset" | "latency">("snapshot");
  const latencyValues = pingSummary.items
    .map((item) => (item.current == null ? null : Number(item.current)))
    .filter((value): value is number => value != null && Number.isFinite(value));
  const avgLatency = latencyValues.length > 0 ? latencyValues.reduce((acc, value) => acc + value, 0) / latencyValues.length : null;
  const maxLatency = latencyValues.length > 0 ? Math.max(...latencyValues) : null;
  const pingBars = buildPingBars(latencyValues);
  const warningSignals = [
    cpuUsage >= 85 ? copy("CPU 压力持续偏高", "CPU pressure remains high") : null,
    memoryUsagePercent >= 85 ? copy("内存接近上限", "Memory is close to saturation") : null,
    diskUsagePercent >= 90 ? copy("磁盘接近满载", "Disk usage is nearing full") : null,
    maxLatency != null && maxLatency >= 120 ? copy("检测到延迟尖峰", "Latency spikes detected") : null,
    expiryDays != null && expiryDays <= 7 ? copy("实例临近到期", "Instance is close to expiry") : null,
  ].filter(Boolean) as string[];

  return (
    <div className="node-detail-body">
      <div className="node-detail-mobile-resource-grid">
        <MobileResourceCard
          title={t("nodeCard.cpu")}
          icon={<Cpu size={18} />}
          primary={`${cpuUsage.toFixed(0)}%`}
          secondary={`${liveData?.load?.load1?.toFixed(2) ?? "-"} / ${node.cpu_cores} ${copy("核", "cores")}`}
          footer={copy("实时占用", "Utilization")}
          tone="cpu"
          barValue={cpuUsage}
          sparkSeed={cpuUsage + 11}
        />
        <MobileResourceCard
          title={t("nodeCard.ram")}
          icon={<MemoryStick size={18} />}
          primary={`${memoryUsagePercent.toFixed(0)}%`}
          secondary={`${formatBytes(liveData?.ram.used || 0)} / ${formatBytes(node.mem_total)}`}
          footer={copy("实时内存", "Memory usage")}
          tone="memory"
          barValue={memoryUsagePercent}
          sparkSeed={memoryUsagePercent + 29}
        />
        <MobileResourceCard
          title={t("nodeCard.disk")}
          icon={<HardDrive size={18} />}
          primary={`${diskUsagePercent.toFixed(0)}%`}
          secondary={`${formatBytes(liveData?.disk.used || 0)} / ${formatBytes(node.disk_total)}`}
          footer={copy("主存储", "Primary storage")}
          tone="disk"
          barValue={diskUsagePercent}
          sparkSeed={diskUsagePercent + 47}
        />
        <MobileResourceCard
          title={t("nodeCard.networkSpeed")}
          icon={<Network size={18} />}
          primary={
            <div className="node-detail-mobile-network-primary">
              <span>↓ {formatBytes(liveData?.network.down || 0)}/s</span>
              <span>↑ {formatBytes(liveData?.network.up || 0)}/s</span>
            </div>
          }
          secondary={formatBytes(networkTotal)}
          footer={copy("累计流量", "Total traffic")}
          tone="network"
          barValue={networkBarValue}
          sparkSeed={networkTotal / 1024 / 1024 + 73}
        />
      </div>

      <div className="node-detail-mobile-summary-grid">
        <div className="node-detail-mobile-panel-tabs" role="tablist" aria-label={copy("详情面板", "Detail Panels") }>
          <button
            type="button"
            className={`node-detail-mobile-panel-tab ${activePanel === "snapshot" ? "is-active" : ""}`}
            onClick={() => setActivePanel("snapshot")}
          >
            {copy("概览", "Overview")}
          </button>
          <button
            type="button"
            className={`node-detail-mobile-panel-tab ${activePanel === "asset" ? "is-active" : ""}`}
            onClick={() => setActivePanel("asset")}
          >
            {copy("资产", "Assets")}
          </button>
          <button
            type="button"
            className={`node-detail-mobile-panel-tab ${activePanel === "latency" ? "is-active" : ""}`}
            onClick={() => setActivePanel("latency")}
          >
            {copy("延迟", "Latency")}
          </button>
        </div>

        {activePanel === "snapshot" && (
          <div className="node-detail-summary-card node-detail-animate" style={{ ["--delay" as any]: "160ms" }}>
            <div className="node-detail-summary-header">
              <div className="node-detail-section-title">{copy("实例快照", "Instance Snapshot")}</div>
            </div>
            <div className="node-detail-summary-items mobile">
              <DetailRow label={t("nodeCard.os")} value={node.os} closeLabel={copy("关闭", "Close")} />
              <DetailRow label={t("nodeCard.arch")} value={node.arch} closeLabel={copy("关闭", "Close")} />
              <DetailRow label={t("nodeCard.version")} value={node.version || "-"} closeLabel={copy("关闭", "Close")} />
              <DetailRow label={t("nodeCard.uptime")} value={liveData?.uptime ? formatUptime(liveData.uptime, t) : "-"} closeLabel={copy("关闭", "Close")} />
              <DetailRow label={copy("更新时间", "Updated")} value={liveData?.updated_at ? new Date(liveData.updated_at).toLocaleString() : "-"} closeLabel={copy("关闭", "Close")} />
              <DetailRow label={copy("虚拟化", "Virtualization")} value={node.virtualization || "-"} closeLabel={copy("关闭", "Close")} />
            </div>
          </div>
        )}

        {activePanel === "asset" && (
          <div className="node-detail-summary-card node-detail-animate" style={{ ["--delay" as any]: "180ms" }}>
            <div className="node-detail-summary-header">
              <div className="node-detail-section-title">{copy("资产详情", "Asset Details")}</div>
            </div>
            <div className="node-detail-mobile-asset-grid">
              <div className="node-detail-mobile-asset-item">
                <span>{copy("计费", "Billing")}</span>
                <strong>{priceLabel}</strong>
              </div>
              <div className="node-detail-mobile-asset-item">
                <span>{copy("到期", "Expiration")}</span>
                <strong>{expiryLabel}</strong>
              </div>
              <div className="node-detail-mobile-asset-item">
                <span>{copy("分组", "Group")}</span>
                <strong>{node.group || copy("未分组", "Ungrouped")}</strong>
              </div>
              <div className="node-detail-mobile-asset-item">
                <span>{copy("流量总计", "Traffic Total")}</span>
                <strong>{formatBytes(networkTotal)}</strong>
              </div>
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
              <div className="node-detail-summary-empty">{copy("未配置流量上限", "No traffic limit configured")}</div>
            )}

            <div className="node-detail-tag-list mobile">
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
          </div>
        )}

        {activePanel === "latency" && (
          <div className="node-detail-summary-card node-detail-animate" style={{ ["--delay" as any]: "200ms" }}>
            <div className="node-detail-summary-header">
              <div className="node-detail-section-title">{copy("延迟摘要", "Latency Summary")}</div>
            </div>
            <div className="node-detail-latency-list mobile">
              {pingSummary.items.length > 0 ? (
                pingSummary.items.slice(0, 6).map((item) => (
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
          </div>
        )}
      </div>

      <div className="node-detail-mobile-ping-card node-detail-animate" style={{ ["--delay" as any]: "220ms" }}>
        <div className="node-detail-mobile-ping-head">
          <span>{copy("Ping (24h)", "Ping (24h)")}</span>
          <strong>{avgLatency == null ? "-" : `${Math.round(avgLatency)} ms`}</strong>
        </div>
        <div className="node-detail-mobile-ping-bars" aria-hidden="true">
          {pingBars.map((height, index) => (
            <span key={`ping-${index}`} style={{ height }} />
          ))}
        </div>
        <div className="node-detail-mobile-ping-meta">
          <span>{copy("峰值", "Peak")} {maxLatency == null ? "-" : `${Math.round(maxLatency)} ms`}</span>
          <span>{copy("区域点位", "Probes")} {pingSummary.items.length}</span>
        </div>
      </div>

      {warningSignals.length > 0 && (
        <div className="node-detail-mobile-risk-banner node-detail-animate" style={{ ["--delay" as any]: "240ms" }}>
          <div className="node-detail-mobile-risk-icon">!</div>
          <div className="node-detail-mobile-risk-copy">
            <strong>{copy("延迟与负载提醒", "Latency and Load Alert")}</strong>
            <span>{warningSignals[0]}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailRow = ({
  label,
  value,
  closeLabel,
}: {
  label: string;
  value: string | string[];
  closeLabel: string;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const valueLines = Array.isArray(value) ? value : [value];
  const rawValue = Array.isArray(value) ? value.join(" ") : value;
  const isTruncated = rawValue.length > 22;

  const handleTouchStart = () => {
    if (isTruncated) {
      const timer = setTimeout(() => {
        setDialogOpen(true);
      }, 500);
      setLongPressTimer(timer);
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleClick = () => {
    if (isTruncated) {
      setDialogOpen(true);
    }
  };

  return (
    <>
      <div
        className="node-detail-row"
        style={{ cursor: isTruncated ? "pointer" : "default" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        <div className="node-detail-row-label">{label}</div>
        <div className={`node-detail-row-value${valueLines.length > 1 ? " stack" : ""}`}>
          {valueLines.length > 1 ? (
            <div className="node-detail-value-stack">
              {valueLines.map((line) => (
                <span key={line} className="node-detail-value-line">
                  {line}
                </span>
              ))}
            </div>
          ) : (
            valueLines[0]
          )}
        </div>
      </div>

      {isTruncated && (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Content style={{ maxWidth: "90vw" }}>
            <Dialog.Title>{label}</Dialog.Title>
            <Dialog.Description>
              <div style={{ wordBreak: "break-all", whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: "1.5" }}>
                {valueLines.map((line, index) => (
                  <div key={`${line}-${index}`}>{line}</div>
                ))}
              </div>
            </Dialog.Description>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
              <Dialog.Close>
                <Button variant="soft">{closeLabel}</Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  );
};