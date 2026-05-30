import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLiveData } from "../../contexts/LiveDataContext";
import { useTranslation } from "react-i18next";
import type { Record } from "../../types/LiveData";
import Flag from "../../components/Flag";
import { SegmentedControl } from "@radix-ui/themes";
import { useNodeList } from "@/contexts/NodeListContext";
import { liveDataToRecords } from "@/utils/RecordHelper";
import EnhancedLoadChart from "./EnhancedLoadChart";
import PingChartV2 from "./PingChartV2";
import { MobileDetailsCard } from "@/components/MobileDetailsCard";
import { MobileLoadChart } from "@/components/MobileLoadChart";
import { useIsMobile } from "@/hooks/use-mobile";
import { DesktopDetailsCard } from "@/components/DesktopDetailsCard";
import { getOSImage } from "@/utils";
import { formatUptime } from "@/components/Node";
import { ArrowLeft, ChevronRight, Copy, GitCompareArrows, Share2, Shield, TriangleAlert, Zap } from "lucide-react";
import "./instance-detail.css";

export default function InstancePage() {
  const { t, i18n } = useTranslation();
  const { onRefresh, live_data } = useLiveData();
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const [recent, setRecent] = useState<Record[]>([]);
  const { nodeList } = useNodeList();
  const length = 60 * 5;
  const [chartView, setChartView] = useState<"load" | "ping">("load");
  const isMobile = useIsMobile();
  const isZh = i18n.resolvedLanguage?.toLowerCase().startsWith("zh");
  const copy = (zh: string, en: string) => (isZh ? zh : en);
  // #region 初始数据加载
  const node = nodeList?.find((n) => n.uuid === uuid);
  const isOnline = live_data?.data?.online?.includes(uuid || "") || false;
  const liveNodeData = uuid ? live_data?.data?.data?.[uuid] : undefined;
  const nodeName = node?.name ?? uuid ?? "";
  const nodeUuid = node?.uuid ?? uuid ?? "";
  const osIcon = getOSImage(node?.os ?? "");
  const uptimeLabel = liveNodeData?.uptime ? formatUptime(liveNodeData.uptime, t) : "-";
  const updatedLabel = liveNodeData?.updated_at ? new Date(liveNodeData.updated_at).toLocaleString() : "-";
  const versionLabel = node?.version || "-";
  const statusText = isOnline ? t("nodeCard.online") : t("nodeCard.offline");
  const cpuUsage = liveNodeData?.cpu?.usage || 0;
  const memUsage = node?.mem_total && liveNodeData ? (liveNodeData.ram.used / node.mem_total) * 100 : 0;
  const diskUsage = node?.disk_total && liveNodeData ? (liveNodeData.disk.used / node.disk_total) * 100 : 0;
  const processCount = liveNodeData?.process || 0;

  const getDaysUntil = (expiredAt?: string) => {
    if (!expiredAt) return null;
    const time = new Date(expiredAt).getTime();
    if (Number.isNaN(time)) return null;
    return Math.ceil((time - Date.now()) / (1000 * 60 * 60 * 24));
  };
  const expiryDays = getDaysUntil(node?.expired_at);

  const mobileSignals = [
    !isOnline ? copy("节点离线，实时数据中断", "Node offline, realtime telemetry interrupted") : null,
    cpuUsage >= 85 ? copy("CPU 长时间高负载，建议立即巡检", "CPU sustained at high load, immediate inspection recommended") : null,
    memUsage >= 85 ? copy("内存占用过高，存在触顶风险", "Memory usage is high and close to saturation") : null,
    diskUsage >= 90 ? copy("磁盘空间接近上限", "Disk usage is nearing capacity") : null,
    expiryDays !== null && expiryDays <= 7 ? copy("节点临近到期，请安排续费", "Node is close to expiration, schedule renewal") : null,
  ].filter(Boolean) as string[];

  const mobileTelemetryTags = [
    { label: copy("CPU", "CPU"), value: `${Math.round(cpuUsage)}%` },
    { label: copy("内存", "Memory"), value: `${Math.round(memUsage)}%` },
    { label: copy("磁盘", "Disk"), value: `${Math.round(diskUsage)}%` },
    { label: copy("进程", "Processes"), value: `${processCount}` },
  ];

  const providerLabel = node?.group || node?.virtualization || copy("未标注来源", "Unknown source");

  const handleCopy = async (value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: nodeName,
          text: nodeName,
          url: shareUrl,
        });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const detailActions = [
    {
      key: "copy",
      label: copy("复制 ID", "Copy ID"),
      icon: <Copy size={16} />,
      onClick: () => handleCopy(nodeUuid),
    },
    {
      key: "compare",
      label: copy("对比", "Compare"),
      icon: <GitCompareArrows size={16} />,
      onClick: () => {},
      disabled: true,
    },
    {
      key: "share",
      label: copy("分享", "Share"),
      icon: <Share2 size={16} />,
      onClick: handleShare,
    },
    {
      key: "admin",
      label: copy("后台", "Admin"),
      icon: <Shield size={16} />,
      onClick: () => navigate("/manage"),
      emphasis: true,
    },
  ];

  useEffect(() => {
    fetch(`/api/recent/${uuid}`)
      .then((res) => res.json())
      .then((data) => setRecent(data.data.slice(-length)))
      .catch((err) => console.error("Failed to fetch recent data:", err));
  }, [uuid]);
  // 动态追加数据
  useEffect(() => {
    const unsubscribe = onRefresh((resp) => {
      if (!uuid) return;
      const data = resp.data.data[uuid];
      if (!data) return;

      setRecent((prev) => {
        const newRecord: Record = data;
        // 追加新数据，限制总长度为length（FIFO）
        // 检查是否已存在相同时间戳的记录
        const exists = prev.some(
          (item) => item.updated_at === newRecord.updated_at
        );
        if (exists) {
          return prev; // 如果已存在，不添加新记录
        }

        // 否则，追加新记录
        const updated = [...prev, newRecord].slice(-length);
        return updated;
      });
    });

    // 清理订阅
    return unsubscribe;
  }, [onRefresh, uuid]);
  // #region 布局
  if (isMobile && node) {
    return (
      <div className="node-detail-shell">
        <div className="node-detail-container">
          <div className="node-detail-breadcrumb node-detail-animate" style={{ ["--delay" as any]: "0ms" }}>
            <button type="button" className="node-detail-back-link" onClick={() => navigate(-1)}>
              <ArrowLeft size={16} />
              <span>{copy("返回", "Back")}</span>
            </button>
            <div className="node-detail-breadcrumb-trail">
              <span>{copy("节点详情", "Instance")}</span>
              <ChevronRight size={14} />
              <span>{nodeName}</span>
            </div>
          </div>

          <div className="node-detail-hero node-detail-animate" style={{ ["--delay" as any]: "0ms" }}>
            <div className="node-detail-hero-top">
              <div className="node-detail-title">
                <Flag flag={node?.region ?? ""} />
                <img className="node-detail-os-icon" src={osIcon} alt={node?.os ?? "OS"} />
                <div className="node-detail-title-text">
                  <div className="node-detail-name-row">
                    <span className="node-detail-name">{nodeName}</span>
                    <span className="node-detail-mono node-detail-uuid-pill">{nodeUuid}</span>
                  </div>
                </div>
              </div>
              <div className={`node-detail-status ${isOnline ? "online" : "offline"}`}>
                {statusText}
              </div>
            </div>
            <div className="node-detail-hero-info">
              <div className="node-detail-hero-item">
                <span className="node-detail-hero-label">{t("nodeCard.version")}</span>
                <span className="node-detail-hero-value">{versionLabel}</span>
              </div>
              <div className="node-detail-hero-item">
                <span className="node-detail-hero-label">{t("nodeCard.uptime")}</span>
                <span className="node-detail-hero-value">{uptimeLabel}</span>
              </div>
              <div className="node-detail-hero-item">
                <span className="node-detail-hero-label">{t("nodeCard.last_updated")}</span>
                <span className="node-detail-hero-value">{updatedLabel}</span>
              </div>
            </div>
          </div>

          <section className="node-detail-mobile-device node-detail-animate" style={{ ["--delay" as any]: "80ms" }}>
            <div className="node-detail-mobile-device-main">
              <div className="node-detail-mobile-device-avatar">
                <img src={osIcon} alt={node?.os ?? "OS"} />
              </div>
              <div className="node-detail-mobile-device-copy">
                <div className="node-detail-mobile-device-label">{copy("设备状态总览", "Device Overview")}</div>
                <div className="node-detail-mobile-device-title">{nodeName}</div>
                <div className="node-detail-mobile-device-subtitle">{providerLabel}</div>
                <div className="node-detail-mobile-device-tags">
                  {mobileTelemetryTags.map((item) => (
                    <span key={item.label} className="node-detail-mobile-device-tag">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {mobileSignals.length > 0 && (
            <div className="node-detail-mobile-alert node-detail-animate" style={{ ["--delay" as any]: "100ms" }}>
              <div className="node-detail-mobile-alert-icon">
                <TriangleAlert size={16} />
              </div>
              <div className="node-detail-mobile-alert-copy">
                <strong>{copy("巡检提醒", "Inspection Alert")}</strong>
                <span>{mobileSignals[0]}</span>
              </div>
              <div className="node-detail-mobile-alert-pulse" aria-hidden="true">
                <Zap size={14} />
              </div>
            </div>
          )}

          <div className="node-detail-actions node-detail-actions-mobile node-detail-animate" style={{ ["--delay" as any]: "120ms" }}>
            {detailActions.map((action) => (
              <button
                key={action.key}
                type="button"
                className={`node-detail-action-button ${action.emphasis ? "is-emphasis" : ""}`}
                onClick={action.onClick}
                disabled={action.disabled}
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
            ))}
          </div>

          <MobileDetailsCard node={node} liveData={liveNodeData} />

          <div className="node-detail-chart-card node-detail-animate" style={{ ["--delay" as any]: "200ms" }}>
            <div className="node-detail-chart-header">
              <div className="node-detail-section-title">{t("nodeCard.chart")}</div>
              <SegmentedControl.Root
                radius="full"
                value={chartView}
                onValueChange={(value) => setChartView(value as "load" | "ping")}
                className="node-detail-toggle"
              >
                <SegmentedControl.Item value="load">
                  {t("nodeCard.load")}
                </SegmentedControl.Item>
                <SegmentedControl.Item value="ping">
                  {t("nodeCard.ping")}
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </div>
            <div className="node-detail-chart-body">
              {chartView === "load" ? (
                <MobileLoadChart
                  data={liveDataToRecords(uuid ?? "", recent)}
                  liveData={liveNodeData}
                  node={node}
                  uuid={uuid}
                />
              ) : (
                <PingChartV2 uuid={uuid ?? ""} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="node-detail-shell">
      <div className="node-detail-container">
        <div className="node-detail-breadcrumb node-detail-animate" style={{ ["--delay" as any]: "0ms" }}>
          <div className="node-detail-breadcrumb-trail">
            <span>{copy("节点实例", "Instances")}</span>
            <ChevronRight size={14} />
            <span>{node?.region || copy("节点详情", "Instance")}</span>
            <ChevronRight size={14} />
            <span>{nodeName}</span>
          </div>
          <button type="button" className="node-detail-back-link" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            <span>{copy("返回", "Back")}</span>
          </button>
        </div>

        <div className="node-detail-hero node-detail-animate" style={{ ["--delay" as any]: "0ms" }}>
          <div className="node-detail-hero-top">
            <div className="node-detail-title">
              <Flag flag={node?.region ?? ""} />
              <img className="node-detail-os-icon" src={osIcon} alt={node?.os ?? "OS"} />
              <div className="node-detail-title-text">
                <div className="node-detail-name-row">
                  <span className="node-detail-name">{nodeName}</span>
                  <span className="node-detail-mono node-detail-uuid-pill">{nodeUuid}</span>
                </div>
              </div>
            </div>
            <div className={`node-detail-status ${isOnline ? "online" : "offline"}`}>
              {statusText}
            </div>
          </div>
          <div className="node-detail-hero-info">
            <div className="node-detail-hero-item">
              <span className="node-detail-hero-label">{t("nodeCard.version")}</span>
              <span className="node-detail-hero-value">{versionLabel}</span>
            </div>
            <div className="node-detail-hero-item">
              <span className="node-detail-hero-label">{t("nodeCard.uptime")}</span>
              <span className="node-detail-hero-value">{uptimeLabel}</span>
            </div>
            <div className="node-detail-hero-item">
              <span className="node-detail-hero-label">{t("nodeCard.last_updated")}</span>
              <span className="node-detail-hero-value">{updatedLabel}</span>
            </div>
          </div>
        </div>

        <div className="node-detail-actions node-detail-animate" style={{ ["--delay" as any]: "120ms" }}>
          {detailActions.map((action) => (
            <button
              key={action.key}
              type="button"
              className={`node-detail-action-button ${action.emphasis ? "is-emphasis" : ""}`}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>

        {node && <DesktopDetailsCard node={node} liveData={liveNodeData} />}

        <div className="node-detail-chart-card node-detail-animate" style={{ ["--delay" as any]: "320ms" }}>
          <div className="node-detail-chart-header">
            <div className="node-detail-section-title">{t("nodeCard.chart")}</div>
            <SegmentedControl.Root
              radius="full"
              value={chartView}
              onValueChange={(value) => setChartView(value as "load" | "ping")}
              size="2"
              className="node-detail-toggle"
            >
              <SegmentedControl.Item value="load">
                {t("nodeCard.load")}
              </SegmentedControl.Item>
              <SegmentedControl.Item value="ping">
                {t("nodeCard.ping")}
              </SegmentedControl.Item>
            </SegmentedControl.Root>
          </div>
          <div className="node-detail-chart-body">
            {chartView === "load" ? (
              <EnhancedLoadChart data={liveDataToRecords(uuid ?? "", recent)} />
            ) : (
              <PingChartV2 uuid={uuid ?? ""} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
