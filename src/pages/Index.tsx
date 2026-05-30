import { Callout, Flex, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import NodeDisplay from "../components/NodeDisplay";
import NodeEarthView from "@/components/NodeEarthView";
import { useLiveData } from "../contexts/LiveDataContext";
import { useNodeList } from "@/contexts/NodeListContext";
import Loading from "@/components/loading";
import { formatBytes } from "@/components/Node";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import type { NodeBasicInfo } from "@/contexts/NodeListContext";
import {
  Activity,
  AlertTriangle,
  Bell,
  Clock3,
  Funnel,
  Globe2,
  Home,
  Network,
  Plus,
  RefreshCcw,
  Server,
  ShieldAlert,
  UserRound,
} from "lucide-react";

type InsightRow = {
  name: string;
  value: string;
  tone?: "success" | "warning" | "danger" | "info";
  sublabel?: string;
};

type MobileFilter = "all" | "critical" | "traffic" | "expiring";

type MobileNodeEntry = {
  node: NodeBasicInfo;
  live?: Record<string, any>;
  online: boolean;
  cpu: number;
  mem: number;
  disk: number;
  traffic: number;
  daysLeft: number | null;
  warning: boolean;
};

const buildMiniBars = (seed: number) =>
  Array.from({ length: 16 }, (_, index) => {
    const raw = Math.abs(Math.sin(seed / 11 + index * 0.58)) * 100;
    return 18 + (raw % 46);
  });

const getDaysUntil = (expiredAt?: string) => {
  if (!expiredAt) return null;
  const time = new Date(expiredAt).getTime();
  if (Number.isNaN(time)) return null;
  return Math.ceil((time - Date.now()) / (1000 * 60 * 60 * 24));
};

const formatTrafficCompact = (bytes: number) => {
  const formatted = formatBytes(bytes);
  return formatted.replace(".00 ", " ");
};

const HomeMetricCard = ({
  label,
  value,
  meta,
  accent,
  bars,
  icon,
}: {
  label: string;
  value: string;
  meta: string;
  accent: "success" | "warning" | "danger" | "info" | "purple" | "cyan";
  bars: number[];
  icon: React.ReactNode;
}) => (
  <article className={`nebula-hero-card nebula-hero-card--${accent}`}>
    <div className="nebula-hero-card-top">
      <div className="nebula-hero-card-icon">{icon}</div>
      <div>
        <div className="nebula-hero-card-label">{label}</div>
        <div className="nebula-hero-card-value">{value}</div>
        <div className="nebula-hero-card-meta">{meta}</div>
      </div>
    </div>
    <div className="nebula-mini-bars" aria-hidden="true">
      {bars.map((height, index) => (
        <span key={`${label}-${index}`} style={{ height }} />
      ))}
    </div>
  </article>
);

const InsightSection = ({
  title,
  rows,
}: {
  title: string;
  rows: InsightRow[];
}) => (
  <div className="nebula-insight-section">
    <div className="nebula-insight-title">{title}</div>
    <div className="nebula-insight-list">
      {rows.map((row) => (
        <div key={`${title}-${row.name}`} className="nebula-insight-row">
          <div>
            <div className="nebula-insight-name">{row.name}</div>
            {row.sublabel && <div className="nebula-insight-sublabel">{row.sublabel}</div>}
          </div>
          <div className={`nebula-insight-value is-${row.tone || "info"}`}>{row.value}</div>
        </div>
      ))}
    </div>
  </div>
);

const MobileStatusCard = ({
  label,
  value,
  meta,
  accent,
  icon,
}: {
  label: string;
  value: string;
  meta: string;
  accent: "success" | "warning" | "danger" | "info" | "purple";
  icon: React.ReactNode;
}) => (
  <article className={`nebula-mobile-status-card is-${accent}`}>
    <div className="nebula-mobile-status-icon">{icon}</div>
    <div className="nebula-mobile-status-label">{label}</div>
    <div className="nebula-mobile-status-value">{value}</div>
    <div className="nebula-mobile-status-meta">{meta}</div>
    <div className="nebula-mobile-status-line" aria-hidden="true">
      <span />
    </div>
  </article>
);

const getMobileStatusTone = (entry: MobileNodeEntry) => {
  if (!entry.online) return "offline" as const;
  if (entry.warning) return "warning" as const;
  return "online" as const;
};

const MobileNodeCard = ({
  entry,
  copy,
}: {
  entry: MobileNodeEntry;
  copy: (zh: string, en: string) => string;
}) => {
  const statusTone = getMobileStatusTone(entry);
  const statusLabel =
    statusTone === "offline"
      ? copy("离线", "Offline")
      : statusTone === "warning"
        ? copy("预警", "Warning")
        : copy("在线", "Online");

  const expiryLabel =
    entry.daysLeft === null
      ? copy("未设置", "Unset")
      : entry.daysLeft >= 0
        ? copy(`${entry.daysLeft} 天`, `${entry.daysLeft} days`)
        : copy("已过期", "Expired");

  return (
    <Link to={`/instance/${entry.node.uuid}`} className={`nebula-mobile-node-card is-${statusTone}`}>
      <div className="nebula-mobile-node-header">
        <div className="nebula-mobile-node-ident">
          <div className="nebula-mobile-node-avatar">{entry.node.name.slice(0, 1).toUpperCase()}</div>
          <div className="nebula-mobile-node-copy">
            <div className="nebula-mobile-node-name-row">
              <strong>{entry.node.name}</strong>
            </div>
            <div className="nebula-mobile-node-meta">
              <span>{entry.node.region}</span>
              <span>{entry.node.group || entry.node.arch || entry.node.os}</span>
            </div>
            <div className="nebula-mobile-node-submeta">
              <span>{entry.live?.updated_at ? new Date(entry.live.updated_at).toLocaleTimeString() : copy("实时同步", "Live sync")}</span>
              <span>{entry.node.version || "-"}</span>
            </div>
          </div>
        </div>
        <span className={`nebula-mobile-node-badge is-${statusTone}`}>{statusLabel}</span>
      </div>

      <div className="nebula-mobile-node-expiry">
        <Clock3 size={14} />
        <span>{copy("到期", "Expiry")}</span>
        <strong>{expiryLabel}</strong>
      </div>

      <div className="nebula-mobile-node-metrics">
        {[
          { label: "CPU", value: `${Math.round(entry.cpu)}%`, percent: entry.cpu, tone: "success" },
          { label: copy("内存", "Memory"), value: `${Math.round(entry.mem)}%`, percent: entry.mem, tone: "info" },
          { label: copy("磁盘", "Disk"), value: `${Math.round(entry.disk)}%`, percent: entry.disk, tone: "purple" },
          {
            label: copy("网卡", "Net I/O"),
            value: `${formatTrafficCompact(entry.traffic)}/s`,
            percent: Math.min(100, Math.max(12, entry.traffic / 1024 / 1024 / 4)),
            tone: "cyan",
          },
        ].map((metric) => (
          <div key={`${entry.node.uuid}-${metric.label}`} className="nebula-mobile-node-metric">
            <div className="nebula-mobile-node-metric-label">{metric.label}</div>
            <div className="nebula-mobile-node-metric-value">{metric.value}</div>
            <div className="nebula-mobile-node-metric-bar">
              <span className={`is-${metric.tone}`} style={{ width: `${metric.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
};

const MobileBottomNav = ({
  copy,
  onScrollTo,
}: {
  copy: (zh: string, en: string) => string;
  onScrollTo: (id: string) => void;
}) => {
  const navItems = [
    {
      key: "home",
      label: copy("首页", "Home"),
      icon: <Home size={18} />,
      onClick: () => onScrollTo("nebula-home-top"),
      active: true,
    },
    {
      key: "nodes",
      label: copy("节点", "Nodes"),
      icon: <Server size={18} />,
      onClick: () => onScrollTo("nebula-home-explorer"),
    },
    {
      key: "alerts",
      label: copy("告警", "Alerts"),
      icon: <Bell size={18} />,
      onClick: () => onScrollTo("nebula-home-insights"),
    },
    {
      key: "profile",
      label: copy("后台", "Manage"),
      icon: <UserRound size={18} />,
      onClick: () => {
        window.location.assign("/manage");
      },
    },
  ];

  return (
    <nav className="nebula-mobile-bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`nebula-mobile-bottom-item ${item.active ? "is-active" : ""}`}
          onClick={item.onClick}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

const Index = () => {
  const { i18n } = useTranslation();
  const { live_data } = useLiveData();
  const { nodeList, isLoading, error } = useNodeList();
  const isMobile = useIsMobile();
  const [mobileFilter, setMobileFilter] = useState<MobileFilter>("all");
  const isZh = i18n.resolvedLanguage?.toLowerCase().startsWith("zh");
  const copy = (zh: string, en: string) => (isZh ? zh : en);

  const liveData = live_data?.data ?? { online: [], data: {} };
  const liveMap = (liveData.data ?? {}) as Record<string, any>;
  const onlineSet = useMemo(() => new Set(liveData.online ?? []), [liveData.online]);

  const dashboard = useMemo(() => {
    const nodes = nodeList ?? [];
    const onlineCount = onlineSet.size;
    const offlineCount = Math.max(0, nodes.length - onlineCount);

    let uploadTotal = 0;
    let downloadTotal = 0;
    let uploadSpeed = 0;
    let downloadSpeed = 0;
    let cpuSum = 0;
    let memSum = 0;
    let diskSum = 0;
    let samples = 0;

    const warningNodes = nodes.filter((node) => {
      const live = liveMap[node.uuid];
      if (!live) return false;
      const memUsage = node.mem_total ? (live.ram?.used || 0) / node.mem_total : 0;
      const diskUsage = node.disk_total ? (live.disk?.used || 0) / node.disk_total : 0;
      const daysLeft = getDaysUntil(node.expired_at);
      const expiringSoon = daysLeft !== null && daysLeft >= 0 && daysLeft <= 14;
      const warning =
        (live.cpu?.usage || 0) >= 70 ||
        memUsage >= 0.8 ||
        diskUsage >= 0.82 ||
        expiringSoon;
      return onlineSet.has(node.uuid) && warning;
    }).length;

    const regionMap = nodes.reduce((acc, node) => {
      const current = acc[node.region] || { total: 0, online: 0 };
      current.total += 1;
      current.online += onlineSet.has(node.uuid) ? 1 : 0;
      acc[node.region] = current;
      return acc;
    }, {} as Record<string, { total: number; online: number }>);

    nodes.forEach((node) => {
      const live = liveMap[node.uuid];
      if (!live) return;
      uploadTotal += live.network?.totalUp || 0;
      downloadTotal += live.network?.totalDown || 0;
      uploadSpeed += live.network?.up || 0;
      downloadSpeed += live.network?.down || 0;
      cpuSum += live.cpu?.usage || 0;
      memSum += node.mem_total ? ((live.ram?.used || 0) / node.mem_total) * 100 : 0;
      diskSum += node.disk_total ? ((live.disk?.used || 0) / node.disk_total) * 100 : 0;
      samples += 1;
    });

    const enrichedNodes = nodes.map((node) => {
      const live = liveMap[node.uuid];
      const memUsage = node.mem_total ? (((live?.ram?.used || 0) / node.mem_total) * 100) : 0;
      const diskUsage = node.disk_total ? (((live?.disk?.used || 0) / node.disk_total) * 100) : 0;
      return {
        node,
        cpu: live?.cpu?.usage || 0,
        mem: memUsage,
        disk: diskUsage,
        traffic: (live?.network?.up || 0) + (live?.network?.down || 0),
        online: onlineSet.has(node.uuid),
        daysLeft: getDaysUntil(node.expired_at),
      };
    });

    const topCpu = enrichedNodes
      .filter((entry) => entry.online)
      .sort((a, b) => b.cpu - a.cpu)
      .slice(0, 5)
      .map((entry) => ({
        name: entry.node.name,
        value: `${Math.round(entry.cpu)}%`,
        tone: entry.cpu >= 80 ? "danger" : entry.cpu >= 60 ? "warning" : "success",
      } as InsightRow));

    const topMemory = enrichedNodes
      .filter((entry) => entry.online)
      .sort((a, b) => b.mem - a.mem)
      .slice(0, 5)
      .map((entry) => ({
        name: entry.node.name,
        value: `${Math.round(entry.mem)}%`,
        tone: entry.mem >= 80 ? "danger" : entry.mem >= 60 ? "warning" : "success",
      } as InsightRow));

    const topNetwork = enrichedNodes
      .filter((entry) => entry.online)
      .sort((a, b) => b.traffic - a.traffic)
      .slice(0, 5)
      .map((entry) => ({
        name: entry.node.name,
        value: formatTrafficCompact(entry.traffic),
        tone: "info",
      } as InsightRow));

    const expiringSoon = enrichedNodes
      .filter((entry) => entry.daysLeft !== null && entry.daysLeft <= 21)
      .sort((a, b) => (a.daysLeft ?? Number.MAX_SAFE_INTEGER) - (b.daysLeft ?? Number.MAX_SAFE_INTEGER))
      .slice(0, 5)
      .map((entry) => ({
        name: entry.node.name,
        value:
          entry.daysLeft !== null && entry.daysLeft >= 0
            ? `${entry.daysLeft}d`
            : copy("已过期", "Expired"),
        tone:
          entry.daysLeft !== null && entry.daysLeft <= 3
            ? "danger"
            : entry.daysLeft !== null && entry.daysLeft <= 10
              ? "warning"
              : "info",
      } as InsightRow));

    const regionHealth = Object.entries(regionMap)
      .sort(([, a], [, b]) => b.total - a.total)
      .slice(0, 5)
      .map(([region, values]) => ({
        name: region,
        sublabel: `${values.total} ${copy("台节点", "nodes")}`,
        value: `${((values.online / Math.max(values.total, 1)) * 100).toFixed(1)}%`,
        tone: values.online === values.total ? "success" : values.online > 0 ? "warning" : "danger",
      } as InsightRow));

    const latestSignals = [
      offlineCount > 0
        ? {
            name: copy("离线节点需要关注", "Offline nodes need attention"),
            sublabel: copy("请优先检查不可用节点", "Prioritize unavailable nodes"),
            value: `${offlineCount}`,
            tone: "danger",
          }
        : null,
      warningNodes > 0
        ? {
            name: copy("高负载节点持续存在", "High-load nodes remain active"),
            sublabel: copy("CPU / 内存 / 磁盘高占用", "CPU / memory / disk under pressure"),
            value: `${warningNodes}`,
            tone: "warning",
          }
        : null,
      expiringSoon.length > 0
        ? {
            name: copy("节点临近到期", "Lifecycle action needed"),
            sublabel: expiringSoon[0]?.name || "-",
            value: expiringSoon[0]?.value || "-",
            tone: "info",
          }
        : null,
    ].filter(Boolean) as InsightRow[];

    return {
      onlineCount,
      offlineCount,
      warningNodes,
      activeRegions: Object.keys(regionMap).length,
      uploadTotal,
      downloadTotal,
      uploadSpeed,
      downloadSpeed,
      totalTraffic: uploadTotal + downloadTotal,
      averages: {
        cpu: samples > 0 ? cpuSum / samples : 0,
        mem: samples > 0 ? memSum / samples : 0,
        disk: samples > 0 ? diskSum / samples : 0,
      },
      topCpu,
      topMemory,
      topNetwork,
      expiringSoon,
      regionHealth,
      latestSignals,
    };
  }, [copy, liveMap, liveData.online, nodeList, onlineSet]);

  const mobileRankedNodes = useMemo(() => {
    const nodes = nodeList ?? [];

    return nodes
      .map((node) => {
        const live = liveMap[node.uuid];
        const cpu = live?.cpu?.usage || 0;
        const mem = node.mem_total ? (((live?.ram?.used || 0) / node.mem_total) * 100) : 0;
        const disk = node.disk_total ? (((live?.disk?.used || 0) / node.disk_total) * 100) : 0;
        const traffic = (live?.network?.up || 0) + (live?.network?.down || 0);
        const daysLeft = getDaysUntil(node.expired_at);
        const online = onlineSet.has(node.uuid);
        const warning = cpu >= 70 || mem >= 80 || disk >= 80 || (daysLeft !== null && daysLeft <= 14);

        return {
          node,
          live,
          online,
          cpu,
          mem,
          disk,
          traffic,
          daysLeft,
          warning,
        } satisfies MobileNodeEntry;
      })
      .sort((left, right) => {
        const leftSeverity = !left.online ? 3 : left.warning ? 2 : 1;
        const rightSeverity = !right.online ? 3 : right.warning ? 2 : 1;
        if (leftSeverity !== rightSeverity) return rightSeverity - leftSeverity;
        if (left.traffic !== right.traffic) return right.traffic - left.traffic;
        return right.cpu - left.cpu;
      });
  }, [liveMap, nodeList, onlineSet]);

  const mobileVisibleNodes = useMemo(() => {
    const filtered = mobileRankedNodes.filter((entry) => {
      if (mobileFilter === "critical") {
        return !entry.online || entry.warning;
      }
      if (mobileFilter === "traffic") {
        return entry.traffic > 0;
      }
      if (mobileFilter === "expiring") {
        return entry.daysLeft !== null && entry.daysLeft <= 30;
      }
      return true;
    });

    return (filtered.length > 0 ? filtered : mobileRankedNodes).slice(0, 4);
  }, [mobileFilter, mobileRankedNodes]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="p-6">Error: {error}</div>;
  }

  const totalCount = nodeList?.length ?? 0;
  const onlinePercent = totalCount > 0 ? (dashboard.onlineCount / totalCount) * 100 : 0;
  const regionPercent = totalCount > 0 ? (dashboard.activeRegions / Math.max(totalCount, 1)) * 100 : 0;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (isMobile) {
    const mobileInsights = dashboard.latestSignals.length > 0
      ? dashboard.latestSignals.slice(0, 3)
      : [
          {
            name: copy("当前没有高优先级异常", "No high-priority anomalies right now"),
            value: copy("稳定", "Stable"),
            tone: "success" as const,
            sublabel: copy("系统整体处于可控状态", "The fleet is operating within expected thresholds"),
          },
        ];

    const mobileFilters = [
      { key: "all" as const, label: copy("全部节点", "All Nodes") },
      { key: "critical" as const, label: copy("关键", "Critical") },
      { key: "traffic" as const, label: copy("流量", "Traffic") },
      { key: "expiring" as const, label: copy("到期", "Expiring") },
    ];

    return (
      <section className="nebula-mobile-home" id="nebula-home-top">
        <Callouts />

        <div className="nebula-mobile-metric-strip">
          <MobileStatusCard
            label={copy("在线", "Online")}
            value={`${dashboard.onlineCount}`}
            meta={`${onlinePercent.toFixed(1)}%`}
            accent="success"
            icon={<Activity size={18} />}
          />
          <MobileStatusCard
            label={copy("预警", "Warning")}
            value={`${dashboard.warningNodes}`}
            meta={copy("高负载", "Hot nodes")}
            accent="warning"
            icon={<AlertTriangle size={18} />}
          />
          <MobileStatusCard
            label={copy("离线", "Offline")}
            value={`${dashboard.offlineCount}`}
            meta={copy("需排查", "Review now")}
            accent="danger"
            icon={<ShieldAlert size={18} />}
          />
          <MobileStatusCard
            label={copy("地区", "Regions")}
            value={`${dashboard.activeRegions}`}
            meta={`${regionPercent.toFixed(1)}%`}
            accent="info"
            icon={<Globe2 size={18} />}
          />
          <MobileStatusCard
            label={copy("总流量", "Traffic")}
            value={formatTrafficCompact(dashboard.totalTraffic)}
            meta={copy("实时汇总", "Realtime")}
            accent="purple"
            icon={<Network size={18} />}
          />
        </div>

        <div className="nebula-mobile-filter-tabs">
          {mobileFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={`nebula-mobile-filter-tab ${mobileFilter === filter.key ? "is-active" : ""}`}
              onClick={() => setMobileFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="nebula-mobile-filter-panel">
          <button type="button" className="nebula-mobile-filter-chip" onClick={() => setMobileFilter("all")}>
            <span>{copy("分组", "Group")}</span>
            <strong>{copy("全部", "All")}</strong>
          </button>
          <button type="button" className="nebula-mobile-filter-chip" onClick={() => setMobileFilter("critical")}>
            <span>{copy("状态", "Status")}</span>
            <strong>{mobileFilter === "critical" ? copy("关键", "Critical") : copy("全部", "All")}</strong>
          </button>
          <button type="button" className="nebula-mobile-filter-chip" onClick={() => setMobileFilter("traffic")}>
            <span>{copy("区域", "Region")}</span>
            <strong>{copy("全球", "Global")}</strong>
          </button>
          <button type="button" className="nebula-mobile-filter-chip" onClick={() => setMobileFilter("expiring")}>
            <span>{copy("生命周期", "Lifecycle")}</span>
            <strong>{mobileFilter === "expiring" ? copy("即将到期", "Expiring") : copy("全部", "All")}</strong>
          </button>
          <button type="button" className="nebula-mobile-filter-action" onClick={() => scrollToSection("nebula-home-explorer")}>
            <Funnel size={18} />
          </button>
        </div>

        <div className="nebula-mobile-node-stack" id="nebula-home-nodes">
          {mobileVisibleNodes.map((entry) => (
            <MobileNodeCard key={entry.node.uuid} entry={entry} copy={copy} />
          ))}
        </div>

        <section className="nebula-surface nebula-mobile-insights-card" id="nebula-home-insights">
          <div className="nebula-panel-header">
            <div>
              <div className="nebula-section-kicker">{copy("洞察", "Insights")}</div>
              <h3 className="nebula-section-title">{copy("移动巡检重点", "Mobile watchlist")}</h3>
            </div>
            <button type="button" className="nebula-mobile-inline-link" onClick={() => scrollToSection("nebula-home-explorer")}>
              {copy("查看全部", "View all")}
            </button>
          </div>
          <InsightSection title={copy("当前重点事项", "Priority Signals")} rows={mobileInsights} />
        </section>

        <section className="nebula-surface nebula-mobile-explorer" id="nebula-home-explorer">
          <div className="nebula-panel-header">
            <div>
              <div className="nebula-section-kicker">{copy("节点浏览", "Explorer")}</div>
              <h3 className="nebula-section-title">{copy("完整节点列表与搜索", "Full node explorer and search")}</h3>
            </div>
          </div>
          <NodeDisplay nodes={nodeList ?? []} liveData={liveData} />
        </section>

        <button type="button" className="nebula-mobile-fab" onClick={() => window.location.assign("/manage") }>
          <Plus size={22} />
        </button>

        <MobileBottomNav copy={copy} onScrollTo={scrollToSection} />
      </section>
    );
  }

  return (
    <section className="nebula-home-shell" id="nebula-home-top">
      <Callouts />

      <div className="nebula-hero-grid">
        <HomeMetricCard
          label={copy("在线节点", "Online Nodes")}
          value={`${dashboard.onlineCount}`}
          meta={`${onlinePercent.toFixed(1)}% ${copy("在线率", "of total")}`}
          accent="success"
          bars={buildMiniBars(dashboard.onlineCount + 7)}
          icon={<Activity size={20} />}
        />
        <HomeMetricCard
          label={copy("预警节点", "Warning Nodes")}
          value={`${dashboard.warningNodes}`}
          meta={copy("高负载或临近到期", "High load or lifecycle risk")}
          accent="warning"
          bars={buildMiniBars(dashboard.warningNodes + 17)}
          icon={<AlertTriangle size={20} />}
        />
        <HomeMetricCard
          label={copy("离线节点", "Offline Nodes")}
          value={`${dashboard.offlineCount}`}
          meta={copy("需要优先排查", "Needs immediate review")}
          accent="danger"
          bars={buildMiniBars(dashboard.offlineCount + 29)}
          icon={<ShieldAlert size={20} />}
        />
        <HomeMetricCard
          label={copy("活跃地区", "Active Regions")}
          value={`${dashboard.activeRegions}`}
          meta={`${regionPercent.toFixed(1)}% ${copy("地域覆盖", "coverage")}`}
          accent="info"
          bars={buildMiniBars(dashboard.activeRegions + 31)}
          icon={<Globe2 size={20} />}
        />
        <HomeMetricCard
          label={copy("总流量", "Total Traffic")}
          value={formatTrafficCompact(dashboard.totalTraffic)}
          meta={`↑ ${formatTrafficCompact(dashboard.uploadSpeed)} / ↓ ${formatTrafficCompact(dashboard.downloadSpeed)}`}
          accent="purple"
          bars={buildMiniBars(dashboard.totalTraffic / 1024 / 1024 + 43)}
          icon={<Network size={20} />}
        />
        <HomeMetricCard
          label={copy("刷新状态", "Refresh State")}
          value={copy("实时", "Live")}
          meta={copy("实时数据流已接入", "Realtime feed connected")}
          accent="cyan"
          bars={buildMiniBars((dashboard.uploadSpeed + dashboard.downloadSpeed) / 1024 + 59)}
          icon={<RefreshCcw size={20} />}
        />
      </div>

      <div className="nebula-home-grid">
        <div className="nebula-home-main" id="nebula-home-nodes">
          <div className="nebula-surface nebula-section-surface">
            <div className="nebula-section-header">
              <div>
                <div className="nebula-section-kicker">{copy("节点总览", "Fleet Explorer")}</div>
                <h2 className="nebula-section-title">{copy("核心节点与筛选控制", "Primary nodes and filtering controls")}</h2>
              </div>
              <div className="nebula-section-note">
                {copy("按视觉基准图保留搜索、分组、视图切换与节点卡矩阵。", "Preserve search, grouping, view switching, and node matrix from the visual baseline.")}
              </div>
            </div>
            <NodeDisplay nodes={nodeList ?? []} liveData={liveData} />
          </div>
        </div>

        <aside className="nebula-home-side" id="nebula-home-insights">
          <section className="nebula-surface nebula-side-panel">
            <div className="nebula-panel-header">
              <div>
                <div className="nebula-section-kicker">{copy("全局态势", "Global Overview")}</div>
                <h3 className="nebula-section-title">{copy("全球节点分布", "World footprint")}</h3>
              </div>
            </div>
            <div className="nebula-map-panel" id="nebula-home-map">
              <NodeEarthView nodes={nodeList ?? []} liveData={liveData} />
            </div>
          </section>

          <section className="nebula-surface nebula-side-panel">
            <div className="nebula-panel-header">
              <div>
                <div className="nebula-section-kicker">{copy("快速洞察", "Quick Insights")}</div>
                <h3 className="nebula-section-title">{copy("重点风险与热点指标", "Risk and hotspot signals")}</h3>
              </div>
            </div>
            <InsightSection title={copy("CPU 压力榜", "Top CPU Pressure")} rows={dashboard.topCpu} />
            <InsightSection title={copy("内存压力榜", "Top Memory Pressure")} rows={dashboard.topMemory} />
            <InsightSection title={copy("网络热点", "Top Network Usage")} rows={dashboard.topNetwork} />
            <InsightSection title={copy("即将到期", "Expiring Soon")} rows={dashboard.expiringSoon} />
          </section>
        </aside>
      </div>

      <div className="nebula-bottom-grid">
        <section className="nebula-surface nebula-analytics-card">
          <div className="nebula-panel-header">
            <div>
              <div className="nebula-section-kicker">{copy("地区健康", "Region Health")}</div>
              <h3 className="nebula-section-title">{copy("区域在线质量概览", "Regional availability overview")}</h3>
            </div>
          </div>
          <InsightSection title={copy("重点区域", "Priority Regions")} rows={dashboard.regionHealth} />
        </section>

        <section className="nebula-surface nebula-analytics-card">
          <div className="nebula-panel-header">
            <div>
              <div className="nebula-section-kicker">{copy("系统概览", "System Overview")}</div>
              <h3 className="nebula-section-title">{copy("总体资源均值", "Average resource usage")}</h3>
            </div>
          </div>
          <div className="nebula-overview-grid">
            <div className="nebula-overview-stat">
              <span>{copy("平均 CPU", "Avg CPU")}</span>
              <strong>{dashboard.averages.cpu.toFixed(0)}%</strong>
            </div>
            <div className="nebula-overview-stat">
              <span>{copy("平均内存", "Avg Memory")}</span>
              <strong>{dashboard.averages.mem.toFixed(0)}%</strong>
            </div>
            <div className="nebula-overview-stat">
              <span>{copy("平均磁盘", "Avg Disk")}</span>
              <strong>{dashboard.averages.disk.toFixed(0)}%</strong>
            </div>
            <div className="nebula-overview-stat">
              <span>{copy("活跃地区", "Regions")}</span>
              <strong>{dashboard.activeRegions}</strong>
            </div>
          </div>
        </section>

        <section className="nebula-surface nebula-analytics-card" id="nebula-home-lifecycle">
          <div className="nebula-panel-header">
            <div>
              <div className="nebula-section-kicker">{copy("运维信号", "Signals")}</div>
              <h3 className="nebula-section-title">{copy("当前最值得处理的事项", "What needs action now")}</h3>
            </div>
          </div>
          <InsightSection
            title={copy("关键提醒", "Latest Signals")}
            rows={dashboard.latestSignals.length > 0 ? dashboard.latestSignals : [
              {
                name: copy("当前没有高优先级异常", "No high-priority anomalies right now"),
                value: copy("稳定", "Stable"),
                tone: "success",
                sublabel: copy("系统整体处于可控状态", "The fleet is operating within expected thresholds"),
              },
            ]}
          />
        </section>
      </div>
    </section>
  );
};

//#region Callouts
const Callouts = () => {
  const [t] = useTranslation();
  const { showCallout } = useLiveData();
  const ishttps = window.location.protocol === "https:";
  return (
    <Flex direction="column" gap="2" className="m-2">
      <Callout.Root m="2" hidden={ishttps} color="red">
        <Callout.Icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10.03 3.659c.856-1.548 3.081-1.548 3.937 0l7.746 14.001c.83 1.5-.255 3.34-1.969 3.34H4.254c-1.715 0-2.8-1.84-1.97-3.34zM12.997 17A.999.999 0 1 0 11 17a.999.999 0 0 0 1.997 0m-.259-7.853a.75.75 0 0 0-1.493.103l.004 4.501l.007.102a.75.75 0 0 0 1.493-.103l-.004-4.502z"
            />
          </svg>
        </Callout.Icon>
        <Callout.Text>
          <Text size="2" weight="medium">
            {t("warn_https")}
          </Text>
        </Callout.Text>
      </Callout.Root>
      <Callout.Root m="2" hidden={showCallout} id="callout" color="tomato">
        <Callout.Icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M21.707 3.707a1 1 0 0 0-1.414-1.414L18.496 4.09a4.25 4.25 0 0 0-5.251.604l-1.068 1.069a1.75 1.75 0 0 0 0 2.474l3.585 3.586a1.75 1.75 0 0 0 2.475 0l1.068-1.068a4.25 4.25 0 0 0 .605-5.25zm-11 8a1 1 0 0 0-1.414-1.414l-1.47 1.47l-.293-.293a.75.75 0 0 0-1.06 0l-1.775 1.775a4.25 4.25 0 0 0-.605 5.25l-1.797 1.798a1 1 0 1 0 1.414 1.414l1.798-1.797a4.25 4.25 0 0 0 5.25-.605l1.775-1.775a.75.75 0 0 0 0-1.06l-.293-.293l1.47-1.47a1 1 0 0 0-1.414-1.414l-1.47 1.47l-1.586-1.586z"
            />
          </svg>
        </Callout.Icon>
        <Callout.Text>
          <Text size="2" weight="medium">
            {t("warn_websocket")}
          </Text>
        </Callout.Text>
      </Callout.Root>
    </Flex>
  );
};
// #endregion Callouts
export default Index;