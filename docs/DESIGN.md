# Show Me It — 设计文档

> 团队 Mockup UI 基础设施。所有项目讨论阶段的 UI 原型展示统一走这里。

## 1. 定位

**一句话**：团队内部的 mockup 展示平台。任何项目需要"看看长什么样"时，agent 在这里快速搭页面，分享链接给建军看。

**不是什么**：
- 不是设计工具（不替代 Figma）
- 不是生产环境前端
- 不是组件库

## 2. 核心需求

| # | 需求 | 优先级 |
|---|------|--------|
| 1 | 多项目隔离——每个项目的 mockup 互不干扰 | P0 |
| 2 | 访问控制——仅团队可见，外部不可访问 | P0 |
| 3 | 快速出原型——agent 能在几分钟内搭出可交互页面 | P0 |
| 4 | 可分享——每个 mockup 有独立 URL，方便在频道里讨论 | P0 |
| 5 | 低维护——不需要复杂部署流程 | P1 |
| 6 | 版本可追溯——mockup 变更有 git 记录 | P1 |

## 3. 架构设计

### 3.1 部署架构

```
用户浏览器
  ↕ HTTPS
Cloudflare (mockup.codetrek.work)
  ↕ Cloudflare Access (OTP 邮箱认证)
  ↕ 反代
Host Caddy
  ↕ 直接 serve 静态文件
/workspace/show-me-it/out/  (Next.js static export output)
```

**关键决策**：
- **纯静态导出**：Next.js `output: 'export'`，生成纯 HTML/CSS/JS，不跑 Node 进程
- **Caddy 直接 serve**：Host 上已有 Caddy，volume 映射 `out/` 目录即可
- **不需要额外进程管理**：没有 Node server，Caddy 已在运行

### 3.2 项目结构

```
show-me-it/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # 首页：项目列表 + mockup 索引
│   │   ├── [project]/
│   │   │   ├── page.tsx                # 项目首页：该项目所有 mockup 列表
│   │   │   └── [mockup]/
│   │   │       └── page.tsx            # 具体 mockup 页面
│   ├── components/
│   │   ├── ui/                         # 通用 UI 组件
│   │   └── layout/                     # 布局组件
│   └── lib/
│       └── registry.ts                 # 读取 mockup-registry.json
├── mockup-registry.json                # mockup 元数据索引
├── out/                                # static export 输出（Caddy serve 这里）
├── docs/
│   ├── DESIGN.md                       # 本文档
│   └── tasks/BOARD.md
└── next.config.ts                      # output: 'export'
```

### 3.3 路由设计

```
/                                → 所有项目列表（从 registry 自动生成）
/{project}                       → 该项目所有 mockup 列表
/{project}/{mockup}              → 具体 mockup 页面
```

约定：项目名和 mockup 名用 kebab-case。

### 3.4 Mockup 注册表

`mockup-registry.json`：

```json
{
  "projects": {
    "societas": {
      "label": "Societas (Office Agent)",
      "mockups": {
        "agent-dashboard": {
          "label": "Agent Dashboard",
          "description": "主控面板，展示 agent 运行状态",
          "author": "战马",
          "date": "2026-04-14",
          "status": "draft"
        }
      }
    }
  }
}
```

`generateStaticParams` 读这个 JSON 来预生成所有动态路由。

## 4. 安全设计

### 4.1 双层防护

| 层 | 位置 | 机制 |
|----|------|------|
| L1 | Cloudflare Edge | Access Policy：OTP 邮箱认证，白名单 `*@codetrek.work` + 建军个人邮箱 |
| L2 | Host Caddy | 可选 basic auth（有 CF Access 已足够） |

### 4.2 安全特性

- 零端口暴露——Caddy 只监听内部，Cloudflare 反代进来
- 纯静态文件——无服务端逻辑，攻击面极小
- Cloudflare Access 自带审计日志
- Mockup 里不放真实数据——用假数据/placeholder

## 5. 工作流

### Agent 创建 mockup：

1. 在 `src/app/{project}/{mockup}/` 创建 `page.tsx`
2. 更新 `mockup-registry.json`
3. `npm run build`（生成 `out/`）
4. `git commit && git push`
5. 在频道发链接：`https://mockup.codetrek.work/{project}/{mockup}`

### 建军看 mockup：

1. 点链接 → CF Access 认证（首次/过期时 OTP）
2. 直接看到 mockup
3. 频道里反馈
4. Agent 改 → rebuild → 刷新即见

## 6. 实施计划

| 阶段 | 内容 | 状态 |
|------|------|------|
| Phase 1 | 项目结构 + 动态路由 + 注册表 + 首页索引 + 示例 mockup | 🔄 进行中 |
| Phase 2 | Cloudflare 反代 + Access + Caddy 配置 | 待 Phase 1 |
| Phase 3 | 通用 UI 组件库 | 按需 |

---

*Author: 飞马 | Date: 2026-04-14 | Status: Approved by 建军 — 小步快跑迭代*
