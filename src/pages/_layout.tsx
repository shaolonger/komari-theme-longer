import { LiveDataProvider, useLiveData } from "@/contexts/LiveDataContext";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NodeListProvider } from "@/contexts/NodeListContext";
import { NebulaBackground } from "../components/Background/NebulaBackground";
import { useTranslation } from "react-i18next";
import {
  Bell,
  Compass,
  Home,
  Layers3,
  ScrollText,
  Server,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePublicInfo } from "@/contexts/PublicInfoContext";

type ShellNavItem = {
  id: string;
  icon: LucideIcon;
  labelZh: string;
  labelEn: string;
  path?: string;
  anchor?: string;
};

const ShellSidebar = () => {
  const { i18n } = useTranslation();
  const { publicInfo } = usePublicInfo();
  const { live_data } = useLiveData();
  const location = useLocation();
  const navigate = useNavigate();
  const isZh = i18n.resolvedLanguage?.toLowerCase().startsWith("zh");
  const copy = (zh: string, en: string) => (isZh ? zh : en);
  const onlineCount = live_data?.data?.online?.length ?? 0;

  const navItems: ShellNavItem[] = [
    {
      id: "command-center",
      icon: Home,
      labelZh: "指挥中心",
      labelEn: "Command Center",
      path: "/",
    },
    {
      id: "nodes",
      icon: Server,
      labelZh: "节点总览",
      labelEn: "Nodes",
      anchor: "nebula-home-nodes",
    },
    {
      id: "regions",
      icon: Compass,
      labelZh: "全球分布",
      labelEn: "Regions",
      anchor: "nebula-home-map",
    },
    {
      id: "alerts",
      icon: Bell,
      labelZh: "关键洞察",
      labelEn: "Insights",
      anchor: "nebula-home-insights",
    },
    {
      id: "reports",
      icon: ScrollText,
      labelZh: "生命周期",
      labelEn: "Lifecycle",
      anchor: "nebula-home-lifecycle",
    },
    {
      id: "manage",
      icon: Settings2,
      labelZh: "后台入口",
      labelEn: "Manage",
      path: "/manage",
    },
  ];

  const handleNav = (item: ShellNavItem) => {
    if (item.path) {
      navigate(item.path);
      return;
    }

    if (!item.anchor) {
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(item.anchor || "")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
      return;
    }

    document.getElementById(item.anchor)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <aside className="nebula-sidebar hidden xl:flex">
      <div className="nebula-sidebar-header">
        <div className="nebula-sidebar-brand-mark">
          <Layers3 size={18} />
        </div>
        <div>
          <div className="nebula-sidebar-brand-title">
            {publicInfo?.sitename || "Komari Monitor"}
          </div>
          <div className="nebula-sidebar-brand-subtitle">Nebula</div>
        </div>
      </div>

      <div className="nebula-sidebar-nav">
        {navItems.map((item) => {
          const active =
            (item.path && location.pathname === item.path) ||
            (!item.path && location.pathname === "/" && item.id === "command-center");
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              className={`nebula-sidebar-item ${active ? "is-active" : ""}`}
              onClick={() => handleNav(item)}
            >
              <Icon size={18} />
              <span>{copy(item.labelZh, item.labelEn)}</span>
            </button>
          );
        })}
      </div>

      <div className="nebula-sidebar-footer">
        <div className="nebula-sidebar-status-card">
          <div className="nebula-status-dot" />
          <div>
            <div className="nebula-sidebar-status-title">
              {copy("系统状态", "System Status")}
            </div>
            <div className="nebula-sidebar-status-subtitle">
              {onlineCount > 0
                ? copy("实时监控已连接", "Live monitor connected")
                : copy("等待实时数据", "Waiting for live data")}
            </div>
          </div>
        </div>

        <div className="nebula-sidebar-meta">
          <div className="nebula-sidebar-meta-copy">© 2026 Komari Monitor</div>
          <div className="nebula-sidebar-meta-copy nebula-sidebar-meta-copy--muted">
            {copy("Nebula 旗舰主题外观", "Nebula flagship theme shell")}
          </div>
        </div>

        <div className="nebula-sidebar-collapsed">
          <ShieldCheck size={14} />
          <span>{copy("桌面指挥舱布局", "Desktop command layout")}</span>
        </div>
      </div>
    </aside>
  );
};

const IndexLayout = () => {
  // 使用我们的LiveDataContext
  const InnerLayout = () => {
    return (
      <div className="nebula-shell">
        <NebulaBackground />
        <ShellSidebar />
        <div className="nebula-main-column">
          <NavBar />
          <main className="nebula-main-scroll">
            <Outlet />
          </main>
          <div className="xl:hidden">
            <Footer />
          </div>
        </div>
      </div>
    );
  };

  return (
    <LiveDataProvider>
      <NodeListProvider>
        <InnerLayout />
      </NodeListProvider>
    </LiveDataProvider>
  );
};

export default IndexLayout;

