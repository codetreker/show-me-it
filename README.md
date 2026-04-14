# Show Me It 🎨

讨论阶段的 Mockup UI 原型展示工具。

## 用途

在产品讨论阶段快速制作和展示 UI 原型，让团队对设计方案有直观感受，减少沟通歧义。

## Tech Stack

- Next.js 15 + TypeScript
- Tailwind CSS
- App Router

## 开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 目录结构

```
src/app/          # 页面路由，每个 mockup 一个路由
src/components/   # 共享组件
```

每个 mockup 创建独立路由，如 `/mockup-login`、`/mockup-dashboard`，便于单独分享链接讨论。
