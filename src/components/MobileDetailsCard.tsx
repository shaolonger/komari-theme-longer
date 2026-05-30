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
        <div className="node-detail-summary-card node-detail-animate" style={{ ["--delay" as any]: "160ms" }}>
          <div className="node-detail-summary-header">
            <div className="node-detail-section-title">{copy("实例快照", "Instance Snapshot")}</div>
          </div>
          <div className="node-detail-summary-items mobile">
            <DetailRow label={t("nodeCard.os")} value={node.os} closeLabel={copy("关闭", "Close")} />
            <DetailRow label={t("nodeCard.arch")} value={node.arch} closeLabel={copy("关闭", "Close")} />
            <DetailRow label={t("nodeCard.version")} value={node.version || "-"} closeLabel={copy("关闭", "Close")} />
            <DetailRow label={t("nodeCard.uptime")} value={liveData?.uptime ? formatUptime(liveData.uptime, t) : "-"} closeLabel={copy("关闭", "Close")} />
          </div>
        </div>

        <div className="node-detail-summary-card node-detail-animate" style={{ ["--delay" as any]: "200ms" }}>
          <div className="node-detail-summary-header">
            <div className="node-detail-section-title">{copy("资产详情", "Asset Details")}</div>
          </div>
          <div className="node-detail-summary-items mobile">
            <DetailRow label={copy("价格", "Price")} value={priceLabel} closeLabel={copy("关闭", "Close")} />
            <DetailRow label={copy("到期", "Expiration")} value={expiryLabel} closeLabel={copy("关闭", "Close")} />
            <DetailRow label={copy("分组", "Group")} value={node.group || copy("未分组", "Ungrouped")} closeLabel={copy("关闭", "Close")} />
            <DetailRow label={copy("累计流量", "Total Traffic")} value={formatBytes(networkTotal)} closeLabel={copy("关闭", "Close")} />
          </div>

          {hasTrafficLimit ? (
            <TrafficLimitChart
              label={t("nodeCard.trafficLimit")}
              type={node.traffic_limit_type}
              percentage={trafficStats.percentage}
              usedLabel={formatBytes(trafficStats.usage)}
              limitLabel={formatBytes(node.traffic_limit || 0)}
            />
          ) : null}

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

        <div className="node-detail-summary-card node-detail-animate" style={{ ["--delay" as any]: "240ms" }}>
          <div className="node-detail-summary-header">
            <div className="node-detail-section-title">{copy("延迟摘要", "Latency Summary")}</div>
          </div>
          <div className="node-detail-latency-list mobile">
            {pingSummary.items.length > 0 ? (
              pingSummary.items.slice(0, 4).map((item) => (
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
      </div>
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