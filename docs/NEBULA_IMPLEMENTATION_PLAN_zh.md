# Nebula 主题实施里程碑与任务清单

## 0. 文档用途

这份文档用于把 [NEBULA_WORLD_CLASS_THEME_SPEC_zh.md](./NEBULA_WORLD_CLASS_THEME_SPEC_zh.md) 拆成可以直接执行的开发计划。

它面向 4 类使用场景：

1. 你自己排优先级和阶段目标。
2. 后续让我按阶段持续落地代码。
3. 拆成 GitHub Issues、Milestones、Projects。
4. 开发完成后逐项对照验收。

本文默认原则：

1. 先做纯前端可闭环能力，再做依赖后端增强的能力。
2. 先做架构和公共层，再做页面大改。
3. 先确保桌面端旗舰体验，再同步压实移动端，不允许最后再“补移动端”。
4. 每个阶段都必须可演示、可回归、可上线。
5. 已确认的 4 张视觉基准图是当前首页与详情页的主参照，默认按接近像素级还原执行。
6. 允许动态适配的是数据内容，不允许随意漂移页面风格、卡片材质、布局层级和图表气质。
7. 所有用户可见文案必须至少支持简体中文和英文，首次访问默认简体中文。

## 1. 当前代码锚点

以下是当前最关键的落点，后续任务默认围绕这些文件展开：

1. `src/main.tsx`：全局 Providers、PWA、主题根入口。
2. `src/routes.ts`：路由树入口。
3. `src/pages/_layout.tsx`：公共布局骨架。
4. `src/pages/Index.tsx`：当前首页。
5. `src/pages/instance/index.tsx`：当前节点详情。
6. `src/components/NodeDisplay.tsx`：首页节点展示总控。
7. `src/components/NavBar.tsx`：导航和全局入口。
8. `src/components/NodeEarthView.tsx`：地图视图。
9. `src/components/Login.tsx`：私有站点登录弹层。
10. `src/contexts/PublicInfoContext.tsx`：站点公共配置与主题设置来源。
11. `src/contexts/NodeListContext.tsx`：节点列表读取。
12. `src/contexts/LiveDataContext.tsx`：实时数据桥。
13. `komari-theme.json`：主题元信息与可配置项。

## 2. 推荐实施节奏

建议按 5 个里程碑推进，而不是一次性铺满全部页面。

| 里程碑 | 周期建议 | 目标 | 交付结果 |
| --- | --- | --- | --- |
| M0 | 1 到 2 周 | 基础重构 | token、数据层、配置层、测试地基 |
| M1 | 2 到 4 周 | 首页旗舰化 | Command Center 首页 + 全局壳子 |
| M2 | 2 到 3 周 | 核心页面旗舰化 | Fleet、Earth、Instance |
| M3 | 2 到 3 周 | 体验完善 | Search、Settings、Manage、状态页、移动端压实 |
| M4 | 2 到 4 周 | 高级能力 | Compare、Asset、Insights、Task/SLO 深化 |

如果要更稳妥，可以理解为：

1. M0 决定后面会不会越做越乱。
2. M1 决定第一眼是否出圈。
3. M2 决定日常是否真好用。
4. M3 决定是否像成熟产品。
5. M4 决定是否达到“顶级主题”上限。

## 3. 里程碑拆解

## M0 基础重构

### 目标

建立不会拖后腿的基础设施，避免后续每个页面都重复造轮子。

### Epic M0-A 设计 Token 与样式基建

#### 任务

1. 建立 `src/styles/tokens/` 目录，抽离颜色、间距、圆角、阴影、发光、动效 token。
2. 定义在线、告警、离线、未知四类状态 token，不再在组件里散落硬编码颜色。
3. 建立卡片、面板、覆盖层、浮层四类 surface token。
4. 建立移动端断点与密度 token。
5. 统一背景层级：底图、粒子层、雾化层、内容层。

#### 当前锚点

1. `src/main.tsx`
2. `src/pages/_layout.tsx`
3. 现有组件样式文件

#### 验收标准

1. 关键页面不再直接写魔法颜色。
2. 同类卡片阴影、模糊、圆角统一。
3. 主题切换或后续换肤时不需要大面积改组件。

### Epic M0-B 数据访问与状态统一

#### 任务

1. 抽离 `/api/public`、节点列表、live data、recent data 的统一 adapters。
2. 给节点、实时数据、统计数据建立稳定类型与容错层。
3. 明确 loading、empty、error、stale 的 UI 状态接口。
4. 把页面里的数据转换逻辑迁出到 selectors 或 adapters。
5. 如果你同意引入依赖，优先在这一阶段接入 TanStack Query。

#### 当前锚点

1. `src/contexts/PublicInfoContext.tsx`
2. `src/contexts/NodeListContext.tsx`
3. `src/contexts/LiveDataContext.tsx`
4. `src/pages/Index.tsx`
5. `src/pages/instance/index.tsx`

#### 验收标准

1. 页面组件主要只负责布局和组合，不直接揉复杂数据。
2. 任意一个接口缺字段时页面不崩。
3. 首页和详情页都能显示完整四态。

### Epic M0-C 主题配置 Schema 整理

#### 任务

1. 审查 `komari-theme.json` 的所有配置项类型。
2. 清理非标准或不利于面板维护的配置项写法。
3. 对现有配置项分组：Layout、Motion、Background、Status、Mobile、Accessibility。
4. 给每个配置项补默认值、说明、允许范围。
5. 增加前端侧读取配置的解析与 fallback。

#### 当前锚点

1. `komari-theme.json`
2. `src/contexts/PublicInfoContext.tsx`
3. `src/components/NodeDisplay.tsx`
4. 背景和外观相关组件

#### 验收标准

1. 每个设置项都能在未配置时稳定回退。
2. 不再出现配置项命名风格混乱。
3. 新设置项可以低成本扩展。

### Epic M0-D 自动化地基

#### 任务

1. 增加统一 `lint`、`typecheck`、`build`、`test` 脚本。
2. 引入 Playwright 基础 E2E 框架。
3. 为首页和节点详情准备视觉回归基线。
4. 补一份开发环境说明，标明如何启动 mock 或对接真实面板。

#### 验收标准

1. 本地一条命令能跑核心校验。
2. 改首页和详情页时能自动发现明显回归。

### Epic M0-E 国际化与文案基线

#### 任务

1. 锁定语言范围下限为 `zh-CN` 和 `en-US`，保证两者都可完整使用。
2. 将首次访问默认语言固定为简体中文，用户主动切换后持久化保存。
3. 清理首页、详情页、导航、空状态中的硬编码文案。
4. 建立中英文长度约束，避免按钮、状态标签、指标标题在英文下挤爆布局。
5. 为视觉基准图中出现的关键文案准备中英映射表，避免实现时临时发挥。

#### 当前锚点

1. `src/i18n/config.ts`
2. `src/i18n/locales/`
3. `src/components/Language.tsx`
4. `src/components/NavBar.tsx`
5. `src/pages/Index.tsx`
6. `src/pages/instance/index.tsx`

#### 验收标准

1. 首次访问默认显示简体中文。
2. 中英切换后刷新页面仍保持选择。
3. 首页和详情页在中英文下都不破版。

## M1 首页旗舰化

### 目标

把 Nebula 从“有潜力的主题”升级为“一打开就知道是旗舰作品”。

### Epic M1-A Global App Shell 重做

#### 任务

1. 重做顶部导航：站点名、连接态、刷新态、全局搜索入口、用户动作区。
2. 设计桌面顶栏和移动端底部操作区的双形态壳子。
3. 建立全局 toast、offline、update、private-site 门厅的一致样式。
4. 保留当前功能，但统一视觉和交互节奏。

#### 当前锚点

1. `src/pages/_layout.tsx`
2. `src/components/NavBar.tsx`
3. `src/components/FloatingMenu.tsx`

#### 验收标准

1. 桌面与移动端导航各自成立。
2. 私有站点、离线、PWA 更新入口不再零散。

### Epic M1-B Command Center 首页重构

#### 任务

1. 首页拆成：Hero 状态带、Health Strip、Filter Bar、Insights、主列表区。
2. 把当前首页节点统计与状态统计重构成更强层级的模块。
3. 增加 Spotlight 区，展示最值得关注的节点。
4. 增加 Quick Insights 区，展示 CPU、内存、流量、过期风险排行。
5. 把当前视图模式切换改造成更高级的 Deck。
6. 处理大节点量下的首屏加载和滚动性能。

#### 当前锚点

1. `src/pages/Index.tsx`
2. `src/components/NodeDisplay.tsx`
3. 首页统计组件

#### 验收标准

1. 首屏 3 秒内能看清全局态势。
2. 不牺牲当前搜索、分组、视图切换能力。
3. 100 到 500 节点下仍然流畅。

### Epic M1-C 首页多状态体系

#### 任务

1. 为首页补 Skeleton 方案，而不是单纯 loading 文案。
2. 没有节点、没有搜索结果、接口失败、数据陈旧分别设计不同状态。
3. 对实时连接中断给出清晰说明。

#### 验收标准

1. 首页在坏状态下仍然像成熟产品，而不是“报错页面”。

## M2 核心页面旗舰化

### 目标

把用户最常访问的 3 个核心页面做成真正的高质量产品面。

### Epic M2-A Fleet Explorer 页面

#### 任务

1. 新建 `/fleet` 路由。
2. 把当前 NodeDisplay 的搜索、分组、分页、视图逻辑抽成可复用 explorer 模块。
3. 增加更完整筛选：名称、地区、分组、状态、系统、架构、价格、账期。
4. 增加 Saved Views 机制，至少先做本地持久化。
5. 增加 Compare Queue 入口，为 M4 做铺垫。

#### 当前锚点

1. `src/routes.ts`
2. `src/components/NodeDisplay.tsx`
3. 节点卡片和表格组件

#### 依赖

1. 依赖 M0 数据层和配置层。

#### 验收标准

1. 用户能比首页更高效地完成筛选和巡检。
2. 移动端不因为筛选复杂而不可用。

### Epic M2-B Earth Situation Room 升级

#### 任务

1. 新建 `/earth` 路由，保留首页 Earth 视图作为入口，但不再只嵌在 NodeDisplay 里。
2. 把地图、区域摘要、区域节点列表拆成独立布局。
3. 实现点击区域后同步过滤节点列表。
4. 增加区域摘要卡、关键区域排行、状态图例。
5. 给地图做性能分级和移动端降级策略。

#### 当前锚点

1. `src/components/NodeEarthView.tsx`
2. `src/routes.ts`

#### 验收标准

1. 地图不再只是单独一块组件，而是完整态势页。
2. 手机端可用且不卡。

### Epic M2-C Instance Profile 重做

#### 任务

1. 重做详情页 Hero 区：状态、地区、版本、更新时间、快速动作。
2. 重构资源指标卡：CPU、内存、磁盘、网络、Swap、GPU。
3. 重做图表区：Load、Ping、未来可扩展 Recent 历史。
4. 增加资产信息区：价格、账期、流量限制、到期时间、分组、标签。
5. 增加解释层：对高负载、离线、接近过期等给出解释。
6. 桌面与移动端分别设计布局，不要只靠响应式挤压。

#### 当前锚点

1. `src/pages/instance/index.tsx`
2. 详情页图表和信息卡组件

#### 验收标准

1. 用户在详情页就能完成值守与初步诊断。
2. 图表切换和平板/手机适配稳定。

## M3 体验完善与产品化

### 目标

让 Nebula 从“高质量页面集合”变成“完整产品体验”。

### Epic M3-A Universal Search / Command Palette

#### 任务

1. 建立 `/search` 或 modal route。
2. 支持节点、分组、地区、标签搜索。
3. 支持快捷动作：跳首页、跳 Earth、跳 Fleet、跳后台、切主题。
4. 支持快捷键 `/` 和 `Ctrl/Cmd+K`。
5. 移动端改为全屏搜索抽屉。

#### 当前锚点

1. `src/components/NavBar.tsx`
2. `src/pages/_layout.tsx`
3. 节点数据层

### Epic M3-B Workspace Settings 页面

#### 任务

1. 新建 `/settings` 路由。
2. 把现有主题设置和用户本地偏好整合成一个工作区偏好页。
3. 至少覆盖 Visual、Density、Motion、Accessibility、Mobile 几组设置。
4. 提供重置默认值能力。

#### 依赖

1. 依赖 M0 配置 schema。

### Epic M3-C Login / Manage Handoff 产品化

#### 任务

1. 升级 `Login` 弹窗的视觉和错误处理。
2. 新建更高级的 `/manage` 入口页。
3. 按登录态区分：未登录、已登录、无权限、可跳转。
4. 提供后台快捷入口卡片。

#### 当前锚点

1. `src/components/Login.tsx`
2. `src/pages/manage.tsx`

### Epic M3-D 状态页家族

#### 任务

1. 升级 `404` 页面。
2. 抽象 Empty、Error、Offline、Loading 通用状态组件。
3. 在首页、Fleet、Earth、Instance 统一接入。

#### 当前锚点

1. `src/pages/404.tsx`
2. 全局组件层

### Epic M3-E 移动端专项

#### 任务

1. 梳理所有高频路径的单手可达性。
2. 统一底部导航、Bottom Sheet、横向滑动筛选器。
3. 为图表、地图、比较视图定义手机降级方案。
4. 做一轮 375px 和 430px 宽度专项回归。

#### 验收标准

1. 不能出现桌面布局机械缩小到手机上的问题。

## M4 高级能力与顶级上限

### 目标

把 Nebula 拉到真正“顶级主题”的能力上限。

### Epic M4-A Compare Lab

#### 任务

1. 新建 `/compare` 路由。
2. 支持 2 到 6 台节点短时对比。
3. 实现指标矩阵、多线图、差异高亮。
4. 支持从首页、Fleet、详情页加入比较。

### Epic M4-B Asset & Lifecycle 页面

#### 任务

1. 新建 `/costs` 路由。
2. 聚合价格、账期、到期时间、流量限制。
3. 做到期风险和流量风险排序。
4. 产出资产视角可视化。

### Epic M4-C Task / SLO 深化

#### 任务

1. 新建 `/tasks` 独立页面。
2. 从现有 Task 视图提升为任务中心。
3. 增加分组延迟、失败排行、SLO 卡片。
4. 如后端支持，再加长期趋势和异常解释。

### Epic M4-D Insights / Anomaly Center

#### 任务

1. 新建 `/insights` 路由。
2. 先做基于前端已有数据的简版洞察。
3. 后续接入后端统计聚合 API 做异常、排行、摘要。

#### 后端依赖

建议后端后续补充：

1. 异常事件聚合接口。
2. 历史统计排行接口。
3. 风险解释字段或聚合结果。

## 4. 建议的 Issue 拆法

为了后续便于推进，建议按下面粒度开 issue，而不是开一个超级大 issue。

### P0 基建类 Issues

1. 建立设计 token 系统。
2. 整理主题配置 schema。
3. 抽离统一数据 adapters。
4. 引入 E2E 与视觉回归基线。

### P1 首页与核心页 Issues

1. 重做 Global App Shell。
2. 重做首页 Hero 与 Insights 模块。
3. 重构 NodeDisplay 为可复用 explorer 内核。
4. 新建 Fleet Explorer 页面。
5. 新建 Earth Situation Room 页面。
6. 重做 Instance Profile 页面。

### P1 产品化 Issues

1. 新建 Command Palette。
2. 新建 Workspace Settings。
3. 升级 Login 与 Manage Handoff。
4. 建立通用状态页家族。
5. 做移动端专项收敛。

### P2 高级能力 Issues

1. 新建 Compare Lab。
2. 新建 Asset & Lifecycle 页面。
3. 重做 Task / SLO Center。
4. 新建 Insights / Anomaly Center。

## 5. 推荐开发顺序

如果后面由我继续连续实施，建议严格按这个顺序推进：

1. M0-A Token 基建。
2. M0-B 数据层整理。
3. M0-C 配置 schema。
4. M0-E 国际化与文案基线。
5. M1-A Global App Shell。
6. M1-B 首页 Command Center。
7. M2-C Instance Profile。
8. M2-A Fleet Explorer。
9. M2-B Earth Situation Room。
10. M3-A Command Palette。
11. M3-B Workspace Settings。
12. M3-C Login / Manage。
13. M3-D 状态页家族。
14. M3-E 移动端专项。
15. M4 高级能力按价值排序依次补齐。

这样排的原因是：

1. 首页和详情页最能定义产品气质。
2. Fleet 和 Earth 更适合建立在稳定内核之上。
3. Search、Settings、状态页适合在主页面语言稳定后统一收口。

## 6. 每阶段 Definition of Done

每个里程碑完成时，至少满足以下条件：

1. 有实际可点击演示页面，不只是静态图。
2. 桌面和移动端都过一轮人工回归。
3. `lint`、`typecheck`、`build` 通过。
4. 至少一条关键路径 E2E 通过。
5. 关键页面补齐截图或视觉回归快照。
6. 新增主题配置项都有默认值和说明。

## 7. 建议你下一步怎么用这份文档

你现在最适合的推进方式有 3 种：

1. 直接让我从 M0 开始连续做代码落地。
2. 让我先把这份文档继续拆成 GitHub Issue 模板文本。
3. 让我先把 M1 首页和 M2 详情页的高保真 AI 出图提示词精修成可直接喂多模态模型的终稿。

如果目标是尽快看到“像世界级主题”的实物，最优先应该先做：

1. M0-A Token 基建。
2. M1-A Global App Shell。
3. M1-B 首页 Command Center。
4. M2-C Instance Profile。
