# Nebula 世界级 Komari 主题设计方案

## 0. 文档定位

这份文档不是灵感清单，而是 `komari-theme-longer` 的产品规格书、视觉规格书、工程规格书和测试验收书的合体版本。

目标不是“做一个更炫的主题”，而是把 Nebula 做成：

1. 最强可视化监控主题。
2. 最强跨端体验主题。
3. 最强实时交互主题。
4. 最强功能覆盖主题。
5. 最强工程质量主题。

它应该具备三层价值：

1. 第一眼震撼：视觉、层次、动效、品牌感达到旗舰级产品水平。
2. 高频使用舒服：监控人员可以一天盯它 8 小时，不累、不乱、不慢。
3. 长期维护可靠：架构稳定、性能可控、测试可重复、配置可扩展。

建议把这份方案当作未来 6 到 12 个月的总蓝图，按阶段拆解落地，而不是试图一次性堆满所有功能。

## 1. 顶级主题的定义

Nebula 要对标的不是普通开源监控面板，而是吸收以下类别产品的最佳实践：

1. 可观测性产品的信噪比与分层表达：Datadog、Grafana、Chronicle、Vercel Observability。
2. 高级效率软件的交互节奏与信息架构：Linear、Raycast、Arc、Superhuman。
3. 高级消费产品的情绪价值与质感控制：Apple、Nothing、Rimowa、Tesla 软件界面。
4. 移动端顶级体验的手势、层级与响应策略：iOS HIG、Material 3、高端金融与专业工具类 App。

Nebula 的关键词应该是：

`Observability-first`、`Command-center`、`Cosmic premium`、`High-density but calm`、`Desktop powerful / Mobile graceful`。

## 2. 当前现实约束

在开始设计前，必须先承认 Komari 主题的现实边界。

### 2.1 平台边界

1. 主题控制的是公开监控页面，不控制 `/admin` 和 `/terminal`。
2. `/manage` 最多只能做“高质量跳转页”或“权限感知入口”，不能复制后台管理系统。
3. 真正涉及告警确认、用户管理、写操作审计、长期事件归档等能力时，需要后端 API 配合。

### 2.2 当前主题现状

当前主题已经具备这些基础能力：

1. 首页多视图模式：Modern、Compact、Classic、Detailed、Task、Earth。
2. 节点详情页：基础信息、负载图、Ping 图。
3. PWA、离线提示、移动端卡片、虚拟滚动、主题设置注入。
4. RPC2 + REST/WS 回退的数据桥。

当前真正存在的页面基线只有：

1. `/` 首页。
2. `/instance/:uuid` 实例详情页。
3. `/manage` 后台跳转页。
4. `*` 404 页。

### 2.3 现有 API 基础

当前前端已经可稳定依赖的能力：

1. `/api/public`
2. `/api/nodes`
3. `/api/recent/:uuid`
4. 实时 live data / online 状态
5. private site 登录能力
6. theme settings 动态配置

因此，第一阶段必须优先做“纯前端可闭环”的世界级体验；第二阶段再推动后端配合做高级能力。

### 2.4 已确认的视觉基准图

以下 4 张图不再只是灵感图，而是当前 Nebula 重构的正式视觉基准：

1. [首页桌面版-final.png](D:/带回去的资料/自建梯子/开源工具/探针/komari-theme-longer/docs/首页桌面版-final.png)
2. [首页手机版-final.png](D:/带回去的资料/自建梯子/开源工具/探针/komari-theme-longer/docs/首页手机版-final.png)
3. [节点详情页桌面版-final.png](D:/带回去的资料/自建梯子/开源工具/探针/komari-theme-longer/docs/节点详情页桌面版-final.png)
4. [节点详情页手机版-final.png](D:/带回去的资料/自建梯子/开源工具/探针/komari-theme-longer/docs/节点详情页手机版-final.png)

实现原则调整为：

1. 首页桌面版和节点详情页桌面版是主视觉金标，默认按接近像素级还原执行。
2. 首页手机版和节点详情页手机版是移动端适配金标，优先还原层级、触达路径、卡片比例和材质风格。
3. 允许动态适配的只有数据内容，不允许随意改视觉语言、布局骨架、卡片材质、圆角、间距和图表风格。
4. 如果某些字段当前公开 API 不提供，可以降级内容，但不能降级气质和排版质量。

### 2.5 语言策略

Nebula 的界面语言必须至少满足以下要求：

1. 必须支持简体中文和英文。
2. 首次访问默认语言为简体中文。
3. 用户手动切换语言后必须持久化记忆。
4. 英文界面必须和中文界面保持功能对等，不允许出现“中文完整、英文残缺”的状态。
5. 页面布局和卡片宽度必须同时兼容中英文文案长度。

## 3. 产品目标与非目标

### 3.1 产品目标

1. 在桌面端成为一个“全天候值守的指挥舱”。
2. 在移动端成为一个“单手即可完成核心巡检”的监控 App 级体验。
3. 在视觉上形成可发布、可传播、可截图即出圈的辨识度。
4. 在性能上保证大节点量场景仍然可用。
5. 在交互上做到新手可上手、老手效率高。
6. 在主题配置上做到面板内可控，而不是每次改代码重打包。

### 3.2 非目标

1. 不在主题里重造后台管理系统。
2. 不为了炫技牺牲信息清晰度。
3. 不默认堆满动画，动效必须服务于状态感知与空间引导。
4. 不做只适合 4K 大屏的设计，必须从手机到桌面都成立。

## 4. 成功指标

### 4.1 体验指标

1. 用户第一次打开首页，3 秒内能看明白整体在线状态、异常节点数、关键区域分布。
2. 用户 2 次点击内进入任意节点详情。
3. 手机端单手操作完成“搜索节点 -> 打开节点详情 -> 看 Ping 图”的路径不超过 10 秒。
4. 用户在 100 到 500 节点量级下，依然能稳定搜索、筛选、翻页或虚拟滚动。

### 4.2 性能指标

1. 首屏静态渲染不白屏。
2. 中档移动设备首屏可交互时间目标小于 3.5 秒。
3. 首页交互帧率在主流桌面设备稳定接近 60fps。
4. 切换视图模式不出现明显布局抖动和滚动跳变。

### 4.3 工程指标

1. 每个关键页面必须具备视觉回归基线。
2. 每个核心数据卡片必须具备 loading / empty / error / stale 四态表现。
3. 每个新增主题设置项必须有默认值、类型约束和 UI 说明。

## 5. 信息架构与路由蓝图

建议 Nebula 的终态路由从当前 4 页扩展为以下结构。

| 路由 | 定位 | 阶段 | 是否纯前端可做 | 说明 |
| --- | --- | --- | --- | --- |
| `/` | Command Center 首页 | P1 | 是 | 默认主入口，展示全局态势 |
| `/fleet` | Fleet Explorer 节点总览 | P1 | 是 | 专注检索、筛选、批量巡检 |
| `/earth` | Earth Situation Room | P1 | 是 | 地理态势与跨区域分布 |
| `/tasks` | Task / SLO Center | P1 | 是 | 延迟监测、任务态、健康概览 |
| `/instance/:uuid` | Instance Profile | P1 | 是 | 节点详情核心页 |
| `/compare` | Compare Lab | P2 | 部分 | 多节点对比，先做短时对比，后做长期对比 |
| `/insights` | Insights / Anomalies | P2 | 需后端增强 | 异常检测、排行、趋势、解释 |
| `/costs` | Asset & Lifecycle | P2 | 部分 | 价格、账期、流量限制、过期风险 |
| `/search` | Universal Search | P1 | 是 | 可做成 modal route 或命令面板 |
| `/settings` | Workspace Preferences | P1 | 是 | 纯主题设置、布局密度、动画偏好 |
| `/manage` | Admin Handoff | P1 | 是 | 高质量跳转页，不复制后台 |
| `*` | 404 / Recovery | P1 | 是 | 错误恢复和入口引导 |

说明：

1. P1 表示主题层即可完成的第一阶段。
2. P2 表示需要一部分后端数据增强，或需要主题先把前端壳子准备好。
3. `/` 与 `/fleet` 可以短期内合并，长期拆开。

## 6. 视觉总方向

### 6.1 核心视觉语言

Nebula 不应该只是“紫色玻璃拟态”。真正成熟的视觉方向应包含：

1. 宇宙氛围，但克制：背景有呼吸感，不喧宾夺主。
2. 仪表台层次：前景卡片、中景连线、背景粒子、边缘发光各司其职。
3. 状态驱动配色：在线、告警、离线、未知必须一眼可分。
4. 高级材质：玻璃、磨砂、微金属、能量边缘、微噪点，而不是普通透明卡片。
5. 数据优先：图表和指标永远优先于装饰。

### 6.2 设计 token 方向

建议建立正式的主题 token 层：

1. `surface.base`, `surface.elevated`, `surface.overlay`
2. `text.primary`, `text.secondary`, `text.muted`, `text.inverse`
3. `state.online`, `state.warning`, `state.offline`, `state.unknown`
4. `glow.success`, `glow.warning`, `glow.danger`
5. `space.2`, `space.4`, `space.8`, `space.12`, `space.16`, `space.24`, `space.32`
6. `radius.card`, `radius.dialog`, `radius.pill`
7. `motion.fast`, `motion.normal`, `motion.slow`

### 6.3 字体与排版

建议采用双字体策略：

1. UI 字体：几何感强、现代、清晰。
2. 数据字体：等宽或半等宽，用于 UUID、速率、延迟、百分比、版本号。

排版要求：

1. 首页主数字必须具备极强的层级感。
2. 卡片副文案必须弱化但可读。
3. 表格和明细页要避免字体太轻导致低对比度。

### 6.4 动效原则

1. 首屏进入动效必须是“分层揭示”，不是乱飞。
2. 卡片 hover 动效必须有弹性但不晃。
3. 状态变化动效要表达“上线、告警、离线”的情绪差异。
4. 图表更新必须平滑过渡。
5. 必须支持 `prefers-reduced-motion`。

## 7. 页面级设计规格

## 7.1 Global App Shell

### 目标

建立一个真正的“指挥舱骨架”，让任何页面都拥有一致的导航、状态、搜索、快捷动作和视觉节奏。

### 核心模块

1. 顶部品牌区：站点名、环境标签、连接态、数据刷新状态。
2. 全局搜索入口：支持快捷键 `/` 和 `Ctrl/Cmd+K`。
3. 视图切换入口：桌面端顶部，移动端底部或浮动快捷菜单。
4. 全局状态区：在线数、异常数、刷新延迟、当前时区。
5. 用户动作区：主题、颜色、语言、登录/后台入口。
6. 全局提示层：离线、PWA 更新、私有站点登录、错误恢复。

### 移动端策略

1. 顶栏高度压缩，保留站点名、搜索、菜单。
2. 使用底部导航或浮动圆盘菜单代替桌面一排按钮。
3. 所有高频操作保持单手可达。

### AI 出图提示词

```text
Design a world-class observability app shell for a premium server monitoring product called Nebula, cosmic command-center aesthetic, advanced glassmorphism, restrained neon edge glow, elegant data-first layout, desktop web app hero shell, top navigation with global search, live connection state, theme controls, floating quick actions, layered nebula background, dark futuristic luxury UI, not gaming UI, not cluttered, extremely polished, realistic product mockup, high information hierarchy, premium SaaS quality, 16:9.
```

## 7.2 首页 / Command Center

### 目标

首页不是简单的节点列表，而是“30 秒内完成全局态势判断”的中控台。

### 核心模块

1. Hero 状态带：在线节点、告警节点、地区数、总上下行、当前刷新状态。
2. Fleet Health Strip：按状态分类的趋势带，展示在线率、异常率、数据延迟。
3. Smart Filter Bar：搜索、分组、标签、价格区间、账期风险、流量临界。
4. View Mode Deck：Modern、Compact、Classic、Detailed、Task、Earth 的智能切换器。
5. Spotlight Cards：自动展示最值得关注的 3 到 5 台节点。
6. Quick Insights：CPU 压力榜、内存压力榜、网络流量榜、即将过期榜。
7. Ambient Metrics：背景粒子速度、霓虹强度、数据波纹与全局吞吐联动。

### 顶级交互要求

1. 搜索支持即时过滤和高亮。
2. 过滤状态持久化到本地。
3. 切换视图模式时保留用户上下文。
4. 大量节点下优先虚拟滚动，必要时分页兜底。
5. Spotlight 卡片可点击进入详情，也可加入比较列表。

### 移动端策略

1. 首页默认只保留最关键状态卡与一个主列表。
2. 过滤器进入 Bottom Sheet。
3. View Mode 用横向可滚动胶囊选择器。
4. 状态卡允许折叠，避免首屏过长。

### AI 出图提示词

```text
Create a flagship monitoring dashboard homepage for a Komari theme called Nebula, futuristic observability command center, premium cosmic background, large status hero strip, intelligent filter bar, modular server cards, top insights widgets, online offline warning states clearly color-coded, luxurious dark UI with sophisticated glass panels and subtle neon edges, practical enterprise dashboard, high density yet calm, desktop first, realistic SaaS mockup, 16:9.
```

## 7.3 Fleet Explorer 页面

### 目标

把“找一台节点”和“批量巡检一批节点”的效率做到极致。

### 核心模块

1. 多维筛选：名称、地区、分组、标签、系统、架构、在线状态、流量限制、价格、账期。
2. Saved Views：允许保存个人视图预设。
3. Bulk Compare Queue：把若干节点加入对比队列。
4. Density Control：高密度列表、卡片列表、表格模式。
5. Keyboard-first 操作：上下切换、回车打开、空格加入比较。

### 移动端策略

1. 搜索置顶。
2. 筛选作为多级 Bottom Sheet。
3. 对比队列作为底部抽屉。

### AI 出图提示词

```text
Design a premium fleet explorer page for a server monitoring product, advanced searchable list with filters, compare queue, density control, tags, regions, status chips, polished enterprise UX, futuristic yet practical, glassmorphism with clear data hierarchy, desktop dashboard mockup with left filter rail and rich node list, realistic high-end SaaS interface.
```

## 7.4 Earth Situation Room

### 目标

把地理分布视图做成真正有价值的态势页，而不是“好看但没用的地图”。

### 核心模块

1. 全球底图与区域高亮。
2. 区域在线状态聚合。
3. 热点区域 Tooltip：在线数、离线数、重点节点。
4. 地区 Drill-down：点击区域后同步过滤节点列表。
5. 全球事件时间轴：最近 15 分钟区域状态波动。
6. 区域链路动画：跨区流量或延迟趋势，可做为后续增强项。

### 移动端策略

1. 默认显示简化地图与区域摘要。
2. Tooltip 改为底部详情卡。
3. 减少地图阴影和复杂动画，优先保证拖拽流畅。

### AI 出图提示词

```text
Create a world-map observability situation room UI, premium cosmic monitoring theme, dark globe dashboard with highlighted active countries, regional online offline states, elegant tooltip cards, global summary metrics, subtle animated connection arcs, luxurious control center aesthetic, realistic SaaS product mockup, cinematic but functional, 16:9.
```

## 7.5 Task / SLO Center

### 目标

把当前 Task 模式升级为真正的延迟监测、SLO 和任务态总控页。

### 核心模块

1. 任务健康总览。
2. TCP/HTTP 延迟分组视图。
3. 最近失败任务与波动排名。
4. 节点承载能力概览：并发、限制、排队风险。
5. SLO 卡片：可用率、响应时间、失败率。

### 后端依赖说明

第一阶段可以先读取现有任务结果；第二阶段如要做 SLO 历史趋势和异常解释，建议新增统一任务聚合 API。

### 移动端策略

1. 默认只显示异常任务和关键 SLO。
2. 趋势图切换为分页卡片或横滑图表。

### AI 出图提示词

```text
Design a flagship latency and SLO operations center for a monitoring system, premium task dashboard, latency cards, failure trend charts, grouped health lanes, command-center UI, dark refined futuristic style, glass panels, sharp typography, enterprise observability quality, mobile-friendly modular layout, realistic mockup.
```

## 7.6 Instance Profile 页面

### 目标

让单节点详情页达到“既能值守，也能诊断，也适合截图分享”的水平。

### 核心模块

1. Hero Summary：节点名称、区域、OS、状态、版本、更新时间、Uptime。
2. Resource Cluster：CPU、内存、磁盘、网络、Swap、GPU。
3. Health Timeline：最近 5 分钟 / 1 小时 / 24 小时趋势。
4. Ping Diagnostics：多维延迟图、峰值、抖动、失败点。
5. Asset Panel：价格、账期、流量限制、到期时间、分组、标签。
6. Quick Actions：复制 UUID、加入比较、分享链接、跳转后台。
7. Explanation Layer：对异常数值给出自然语言解释。

### 桌面体验

1. 详情卡 + 双图表并列。
2. 侧边信息栏固定。
3. 图表支持 hover 联动和时间范围切换。

### 移动端体验

1. 详情卡片竖排堆叠。
2. 图表切换使用 segmented control。
3. 关键数值前置，次要字段折叠。

### AI 出图提示词

```text
Create a world-class server instance detail page, premium observability UI, large hero header with region flag and status, elegant resource cards, rich load and ping charts, asset and billing metadata, luxury dark cosmic dashboard style, highly polished glassmorphism, realistic product interface, desktop detail view, information-rich but clean.
```

## 7.7 Compare Lab

### 目标

支持用户把 2 到 6 台节点放在同一屏里比较，不再依赖肉眼来回切换详情页。

### 核心模块

1. 目标节点选择器。
2. 关键指标对比矩阵。
3. 趋势图多线对比。
4. 差异高亮：谁更快、谁更满、谁更贵、谁更接近过期。
5. 一键生成分享图。

### 阶段建议

1. P1：基于实时数据与近期数据做短时对比。
2. P2：增加历史区间对比和异常解释。

### AI 出图提示词

```text
Design a premium compare lab page for multiple servers, side-by-side comparison cards, aligned metrics table, synchronized charts, difference highlighting, luxurious but readable observability UI, futuristic dark SaaS style, sharp enterprise-grade product mockup, powerful analyst workflow.
```

## 7.8 Insights / Anomaly Center

### 目标

把“看监控”升级为“理解系统正在发生什么”。

### 核心模块

1. 异常节点排行。
2. 最近 24 小时异常事件流。
3. 区域风险热度。
4. 容量风险预测。
5. 延迟尖峰解释。
6. 智能摘要：用自然语言总结当前系统态势。

### 后端依赖说明

这一页如果只依赖当前 API，价值有限。建议后端后续增加：

1. 异常事件聚合接口。
2. 基于记录数据的排行与统计接口。
3. 风险解释或预计算字段。

### AI 出图提示词

```text
Create an anomaly insights center for a premium monitoring platform, ranked risk widgets, narrative insight cards, anomaly timeline, trend heatmaps, executive observability cockpit, luxurious dark theme, elegant analytics dashboard, high-end enterprise SaaS mockup, futuristic but credible.
```

## 7.9 Asset & Lifecycle 页面

### 目标

把 Komari 已有的价格、账期、流量限制、过期时间数据真正转化成管理价值。

### 核心模块

1. 价格分布。
2. 账期到期列表。
3. 流量限制使用率排行。
4. 成本密度：每区域、每分组、每在线节点成本。
5. 生命周期卡片：新建、稳定、接近过期。

### 价值

这页可以让 Nebula 从“炫酷监控主题”升级为“资产与运维联动主题”。

### AI 出图提示词

```text
Design a premium asset and lifecycle dashboard for monitored servers, billing cycles, price analytics, expiration risks, traffic limit utilization, executive-quality operational finance UI, dark luxury cosmic theme, precise charts and tables, realistic product mockup.
```

## 7.10 Universal Search / Command Palette

### 目标

给高手用户一个秒级直达系统所有关键对象的入口。

### 功能

1. 搜索节点、分组、区域、标签。
2. 跳转到节点详情、Earth 视图、Task 视图、后台。
3. 快捷命令：切换主题模式、切换语言、切换视图。
4. 最近访问记录。
5. 键盘完全可操作。

### 移动端策略

1. 手机端做成全屏搜索抽屉。
2. 支持语义化搜索提示，但不引入复杂 AI 依赖。

### AI 出图提示词

```text
Design a world-class command palette overlay for a monitoring dashboard, search-first productivity UI, keyboard-centric, premium dark translucent modal, grouped results, recent actions, quick commands, very polished product design, inspired by elite productivity software but adapted for observability.
```

## 7.11 Workspace Settings 页面

### 目标

让用户在不改代码的情况下，调出自己的最佳工作方式。

### 功能分类

1. Visual：粒子、背景、模糊、亮度、边框、动效强度。
2. Density：卡片密度、列表密度、分页、虚拟滚动。
3. Charts：默认时间范围、图表样式、色彩模式。
4. Alerts：是否突出显示高风险节点。
5. Accessibility：减少动画、高对比、放大数字、色盲友好。
6. Mobile：默认首页模块、简化地图、压缩图表模式。

### 主题配置演进要求

后续 `komari-theme.json` 中的配置类型必须统一到 Komari 规范支持的类型，不再使用非标准 `input`。

### AI 出图提示词

```text
Design a premium workspace settings page for a futuristic monitoring theme, advanced personalization controls, grouped settings cards, sliders, toggles, segmented chips, accessibility and motion controls, elegant glass panels, high-end SaaS settings experience, desktop and mobile compatible.
```

## 7.12 Login / Private Site Dialog

### 目标

把当前登录弹窗升级成更高级的“访问门厅”。

### 功能

1. 私有站点说明。
2. 普通登录与 OAuth 登录。
3. 2FA 二阶段输入。
4. 安全说明与错误提示。
5. 登录成功后的上下文回跳。

### 设计要求

1. 登录弹窗必须有安全感和仪式感，但不要像普通后台表单。
2. 输入焦点、出错、2FA 切换过程要流畅。

### AI 出图提示词

```text
Create a premium secure login modal for a private monitoring site, elegant futuristic authentication dialog, luxurious dark translucent panel, subtle cosmic background, username password and 2FA states, OAuth button, credible security-focused UI, realistic product design.
```

## 7.13 Manage Handoff 页面

### 目标

把当前单纯的 `/admin` 跳转改成更有品质的后台入口页。

### 功能

1. 权限校验后自动跳转。
2. 若未登录，显示登录门厅。
3. 若已登录但无权限，给出明确说明。
4. 可展示后台快捷入口：节点管理、主题设置、告警、账户。

### 注意

不在主题层复制后台功能，只做优雅入口。

### AI 出图提示词

```text
Design a polished admin handoff page for a monitoring theme, premium gateway screen to the control panel, elegant shortcuts, security messaging, dark futuristic design, high-end operational SaaS quality, not a full admin dashboard.
```

## 7.14 404 / Empty / Error / Offline / Loading 页面族

### 目标

世界级体验不是只有正常态，异常态也要足够强。

### 页面族要求

1. 404：有品牌感、有回退路径、有推荐入口。
2. Empty：没有节点、没有搜索结果、没有地图命中，都要各自有说明。
3. Error：网络错误、权限错误、数据结构异常，要区分处理。
4. Offline：明显告诉用户当前是离线快照还是实时断开。
5. Loading：骨架屏 + 轻微氛围动画，而不是纯 spinner。

### AI 出图提示词

```text
Design a family of premium product states for a monitoring platform: 404 page, empty state, loading skeleton, offline warning, error recovery cards, consistent cosmic luxury visual language, highly polished UI, practical and emotionally reassuring.
```

## 8. 主题配置系统升级方案

建议把主题设置扩展成以下分类，并保持配置项能直接映射到面板后台的 theme settings。

### 8.1 Layout

1. `layout.density`
2. `layout.cardRadius`
3. `layout.cardGap`
4. `layout.maxContentWidth`

### 8.2 Motion

1. `motion.level`
2. `motion.enableParallax`
3. `motion.enableLivePulse`
4. `motion.enableCardHover`

### 8.3 Background

1. `background.mode`
2. `background.imageUrl`
3. `background.videoUrl`
4. `background.particleIntensity`

### 8.4 Status Visualization

1. `status.highlightHotNodes`
2. `status.offlinePlacement`
3. `status.glowStrength`
4. `status.useColorBlindPalette`

### 8.5 Mobile

1. `mobile.defaultHomeSection`
2. `mobile.compactCharts`
3. `mobile.showBottomNav`
4. `mobile.earthFallbackMode`

### 8.6 Accessibility

1. `a11y.reduceMotion`
2. `a11y.highContrast`
3. `a11y.largeNumerals`
4. `a11y.enhancedFocusRing`

## 9. 工程架构方案

## 9.1 推荐技术结构

保持与当前仓库兼容，但升级到更适合长期维护的层次：

1. React 19 + Vite 继续保留。
2. Radix 继续作为基础无障碍组件层。
3. Server state 建议引入 TanStack Query。
4. 本地 UI 状态建议引入 Zustand 或继续用精简 Context，但不要再让复杂筛选状态散落在大组件里。
5. 数据连接保留 RPC2 优先、REST/WS 回退模型。
6. 图表层建议做统一适配，不让每个页面自己拼数据。

## 9.2 前端目录规划

建议逐步收敛为：

1. `app/`：app shell、providers、router。
2. `domains/fleet/`：节点总览、筛选、表格、卡片。
3. `domains/instance/`：节点详情。
4. `domains/earth/`：地图态势。
5. `domains/tasks/`：任务与延迟监测。
6. `domains/insights/`：异常与洞察。
7. `components/system/`：按钮、卡片、状态标签、骨架屏。
8. `components/charts/`：统一图表层。
9. `styles/tokens/`：设计 token。

## 9.3 数据层规范

1. 所有 API 调用必须经过统一适配层。
2. 数据对象必须有 runtime guard 或最少容错层。
3. 任何页面都不能直接假定接口字段永远存在。
4. 实时数据和静态数据要明确分层。
5. recent/history 数据必须允许缺失，不得导致整页崩溃。

## 9.4 性能规范

1. 首页大组件必须分片。
2. 非首屏视图延迟加载。
3. 地图和重图表仅在进入对应视图时加载。
4. 虚拟滚动必须成为大数据量场景的默认策略之一。
5. 背景粒子、图表动画、地图 hover 效果都要支持性能降级档位。

## 9.5 可访问性规范

1. 键盘导航必须覆盖搜索、切换、列表、命令面板。
2. 所有交互控件都要有清晰 focus ring。
3. 状态颜色不能只依赖颜色本身，必须有形状或图标辅助。
4. 主要页面对比度不低于可读阈值。
5. `prefers-reduced-motion` 必须有效。

## 9.6 国际化规范

1. 文案不硬编码。
2. 数值、时间、货币、日期按 locale 格式化。
3. 中英文都要保证排版美观，不允许中文挤爆控件。

## 10. 开发规范

### 10.1 组件规范

1. 一个组件只做一件事。
2. 页面组件不直接写复杂业务逻辑。
3. 图表数据转换统一放到 `adapters` 或 `selectors`。
4. 所有卡片组件必须支持 loading / empty / error。

### 10.2 样式规范

1. 优先 token 驱动，不允许魔法数泛滥。
2. 统一阴影、发光、模糊、圆角等级。
3. 动效时长必须从 token 里拿。
4. 移动端不允许靠桌面样式强行压缩。

### 10.3 交互规范

1. 任何会改变上下文的操作都要可预期。
2. 同一类筛选器、切换器、时间范围控件必须长得一致。
3. 所有异步操作必须给出反馈。
4. 可撤销的操作要支持撤销。

### 10.4 代码质量规范

1. 必须开启 lint、typecheck、构建校验。
2. 新增页面必须自带最少一组组件测试或交互测试。
3. 重大页面必须配视觉回归快照。
4. PR 评审必须检查移动端截图。

## 11. 测试与验收标准

## 11.1 测试金字塔

1. 单元测试：数据适配、格式化、状态计算、筛选逻辑。
2. 组件测试：卡片、表格、图表外壳、命令面板。
3. 集成测试：首页数据流、详情页刷新、搜索过滤。
4. E2E：关键路径。
5. 视觉回归：桌面和移动双基线。

## 11.2 必测关键路径

1. 打开首页并看到实时数据。
2. 搜索节点并进入详情页。
3. 切换视图模式并保留状态。
4. 打开 Earth 页面并点击区域。
5. 在移动端打开节点详情并切换 load/ping 图。
6. 私有站点登录并跳转后台。
7. 离线或接口失败时正确显示错误态。

## 11.3 视觉回归验收

至少覆盖：

1. 首页桌面端。
2. 首页移动端。
3. Fleet Explorer 桌面端。
4. Earth 页面桌面端。
5. 节点详情桌面端。
6. 节点详情移动端。
7. 登录弹窗。
8. 404 / empty / offline。

## 11.4 性能验收

建议预算：

1. 首屏 JS 关键路径尽量控制在可接受范围。
2. 地图页首次打开允许稍重，但二次打开必须明显更快。
3. 500 节点下搜索响应必须稳定。
4. 手机端滚动不能大面积掉帧。

## 11.5 无障碍验收

1. 键盘可达率通过。
2. Lighthouse Accessibility 不低于高分区间。
3. 高对比模式可用。
4. 减少动画模式不破坏布局。

## 11.6 跨端验收矩阵

必须覆盖：

1. 桌面宽屏：1440px 及以上。
2. 常规笔记本：1280px。
3. 平板竖屏：768px 左右。
4. 大手机：430px 左右。
5. 小手机：375px 左右。

## 12. 分阶段路线图

## Phase 0：基础重构

1. 建立 token 系统。
2. 引入统一数据层。
3. 收敛通用卡片、图表、状态组件。
4. 修复当前主题配置类型不规范问题。

## Phase 1：世界级可用核心

1. 重做首页 Command Center。
2. 升级 Fleet Explorer。
3. 升级 Instance Profile。
4. 重做 Earth 页面。
5. 做好移动端导航、底部菜单、搜索面板。
6. 完成状态页家族。

## Phase 2：世界级功能覆盖

1. Compare Lab。
2. Task / SLO Center 深化。
3. Asset & Lifecycle 页面。
4. Workspace Settings 页面。
5. Command Palette。

## Phase 3：世界级智能体验

1. Insights / Anomaly Center。
2. 自然语言摘要。
3. 高级异常解释。
4. 分享图与展示模式。

## 13. 立即执行建议

如果要把这份方案真正落地，建议下一步优先做这 5 件事：

1. 先冻结视觉方向，产出一套统一 moodboard 和 token 草案。
2. 先做 Command Center 首页高保真稿和节点详情高保真稿。
3. 先重构数据层和公共卡片层，再大改页面。
4. 先补齐主题设置 schema，淘汰非标准 `input` 类型。
5. 先建立 Playwright + 视觉回归基线，再开始大规模 UI 重构。

## 14. 推荐你先让多模态模型生成的 6 张关键图

如果只先出 6 张图，优先级如下：

1. Global App Shell + 首页 Command Center 桌面端。
2. 首页移动端。
3. Instance Profile 桌面端。
4. Instance Profile 移动端。
5. Earth Situation Room 桌面端。
6. Universal Search / Command Palette 弹层。

这 6 张图定下来后，Nebula 的主设计语言就基本定型了。
