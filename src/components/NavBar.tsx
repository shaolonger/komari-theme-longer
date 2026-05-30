import ThemeSwitch from "./ThemeSwitch";
import ColorSwitch from "./ColorSwitch";
import LanguageSwitch from "./Language";
import LoginDialog from "./Login";
import { Button, DropdownMenu, IconButton } from "@radix-ui/themes";
import { Link, useLocation } from "react-router-dom";
import { usePublicInfo } from "@/contexts/PublicInfoContext";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { Bell, Menu, RefreshCcw, Search, Wifi } from "lucide-react";
import { useLiveData } from "@/contexts/LiveDataContext";

const NavBar = () => {
  const { publicInfo } = usePublicInfo();
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const { live_data } = useLiveData();
  const location = useLocation();
  const isZh = i18n.resolvedLanguage?.toLowerCase().startsWith("zh");
  const copy = (zh: string, en: string) => (isZh ? zh : en);
  const isConnected = Boolean(live_data?.data);

  if (location.pathname.startsWith("/instance/")) {
    return null;
  }

  const focusNodeSearch = () => {
    window.dispatchEvent(new CustomEvent("nebula:focus-node-search"));
  };
  
  return (
    <>
      <nav className="nebula-topbar">
        <div className="nebula-mobile-brand xl:hidden">
          <Link to="/" className="nebula-mobile-brand-link">
            <span className="nebula-mobile-brand-title">
              {publicInfo?.sitename || "Komari Monitor"}
            </span>
            <span className="nebula-mobile-brand-subtitle">Nebula</span>
          </Link>
        </div>

        <button type="button" className="nebula-search-trigger" onClick={focusNodeSearch}>
          <Search size={18} />
          <span className="nebula-search-trigger-text">
            {copy("搜索节点、服务器、地区...", "Search nodes, servers, regions...")}
          </span>
          {!isMobile && <span className="nebula-search-shortcut">⌘ K</span>}
        </button>

        <div className="nebula-topbar-actions">
          <div className={`nebula-topbar-chip ${isConnected ? "is-success" : "is-muted"}`}>
            <Wifi size={16} />
            <div>
              <div className="nebula-topbar-chip-title">
                {copy("实时连接", "Live Connection")}
              </div>
              <div className="nebula-topbar-chip-subtitle">
                {isConnected ? copy("已连接", "Connected") : copy("等待连接", "Waiting")}
              </div>
            </div>
          </div>

          {!isMobile && (
            <div className="nebula-topbar-chip">
              <RefreshCcw size={16} />
              <div>
                <div className="nebula-topbar-chip-title">{copy("自动刷新", "Auto-refresh")}</div>
                <div className="nebula-topbar-chip-subtitle">15s</div>
              </div>
            </div>
          )}

          {!isMobile && <ThemeSwitch />}
          {!isMobile && <ColorSwitch />}
          {!isMobile && <LanguageSwitch />}

          {!isMobile && (
            <IconButton variant="soft" className="nebula-icon-button">
              <Bell size={18} />
            </IconButton>
          )}

          {!isMobile && (
            <Button variant="soft" className="nebula-environment-chip">
              {copy("生产环境", "Production")}
            </Button>
          )}

          {!isMobile &&
            (publicInfo?.private_site ? (
              <LoginDialog
                autoOpen={publicInfo?.private_site}
                info={t("common.private_site")}
                onLoginSuccess={() => {
                  window.location.reload();
                }}
              />
            ) : (
              <LoginDialog />
            ))}

          {isMobile && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <IconButton variant="soft" className="nebula-icon-button">
                  <Menu size={20} />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end" className="min-w-[220px]">
                <DropdownMenu.Label>{copy("界面控制", "Interface Controls")}</DropdownMenu.Label>
                <DropdownMenu.Separator />
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <ThemeSwitch />
                  <ColorSwitch />
                  <LanguageSwitch />
                </div>
                <DropdownMenu.Separator />
                <div className="px-2 py-1.5">
                  {publicInfo?.private_site ? (
                    <LoginDialog
                      autoOpen={publicInfo?.private_site}
                      info={t("common.private_site")}
                      onLoginSuccess={() => {
                        window.location.reload();
                      }}
                    />
                  ) : (
                    <LoginDialog trigger={copy("登录 / 后台", "Login / Manage")} />
                  )}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </div>
      </nav>
    </>
  );
};
export default NavBar;
