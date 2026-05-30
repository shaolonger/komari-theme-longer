# Nebula 4 图逐项验收清单

## 1. 验收范围

本清单按 4 张视觉基准图逐项核对已落地能力，并给出可追溯提交。

- 首页桌面版-final.png
- 首页手机版-final.png
- 节点详情页桌面版-final.png
- 节点详情页手机版-final.png

## 2. 逐图验收结果

| 基准图 | 核心验收点 | 状态 | 对应提交 |
| --- | --- | --- | --- |
| 首页桌面版 | Command Header、Spotlight、双层筛选条、底部分析区高密度卡片 | 已完成 | f9f7ee5, 6a5fe22, 6908a4b |
| 首页手机版 | 移动 Command Shell、状态卡、过滤条、节点卡层级、FAB 与底部导航 | 已完成 | 6613ca2, c5564e9 |
| 节点详情页桌面版 | Hero + Action、工作负载概览、右侧情报栏、Load/Ping 双图并排 | 已完成 | e379156, 69f2b04, da7c36f |
| 节点详情页手机版 | 设备总览、风险提醒、面板 Tabs、资产矩阵、Ping 卡、主图+次图堆叠 | 已完成 | c9bb302, 4393ca4, 2eeb4e3, 76f8d0f |

## 3. 关键实现归档

### 3.1 首页

- 桌面结构和视觉主文件
  - src/pages/Index.tsx
  - src/global.css
- 已实现内容
  - Command Deck 首屏层级
  - Spotlight 节点优先级卡片
  - 双层筛选条（上层状态 chips + 下层搜索/地区/结果）
  - 底部 4 区分析卡（含 Recent Events 时间线）

### 3.2 节点详情页

- 详情结构和视觉主文件
  - src/pages/instance/index.tsx
  - src/pages/instance/instance-detail.css
  - src/components/MobileDetailsCard.tsx
- 已实现内容
  - 桌面：中层工作负载摘要 + 风险提醒 + 右侧情报栏 + 双图并排
  - 移动：Hero 层次增强 + 中下区 Tabs + 资产矩阵 + Ping 摘要 + 风险横幅 + 主次图顺序

## 4. 可回归验证

已执行生产构建校验：

- 命令: npm run build
- 结果: 通过
- 备注: 仍存在既有 chunk size warning，无新增构建失败

## 5. 残余风险与说明

1. 当前验收以代码实现和构建通过为主，未接入自动化像素对比（Playwright 视觉回归尚未纳入本轮）。
2. 由于运行时真实数据波动，截图数值与基准图不可能完全一致；验收口径应以布局骨架、信息层级、材质气质一致为准。

## 6. 结论

在当前公开数据能力范围内，4 张基准图对应的核心结构与视觉层级已全部落地，可进入签收阶段。
