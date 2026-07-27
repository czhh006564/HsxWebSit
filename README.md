# 慧速学AI伴学中心 · 官网落地页

基于 `技术栈.md` 的现代化全栈免费方案搭建的机构宣传官网 / 落地页。

> 技术栈：**Next.js 15 (App Router) + Vercel + Supabase (PostgreSQL)**
> 特点：微信内 SSR 秒开、CI/CD 自动部署、0 托管成本、为注册与学习数据留好扩展空间。

---

## 一、本地开发

```bash
npm install        # 安装依赖
npm run dev        # 本地开发，访问 http://localhost:3000
npm run build      # 生产构建校验
npm run start      # 启动生产服务
```

> 首次运行 `npm install` 需联网下载 Next.js / React / Supabase 依赖（约 1-2 分钟）。

---

## 二、页面结构

| 区块 | 说明 |
| --- | --- |
| Hero | 机构口号、四大业务速览、累计服务数据 |
| 核心业务 | AI单词速记 / AI满分导航 / AI中高考答题技巧 / AI智能伴学系统 |
| 学习模式 | AI规划 + 真人伴学（一线老师 / 专业伴学师 / 学生家长） |
| 解决什么问题 | 每个业务对应的真实学习困境 |
| 免费体验 | 3 大 20 分钟免费体验（学习力体检 / 单词速记 / 中考技巧） |
| 低价引流 | 线下 19.9 起、线上 49.9 起、198 全家桶 |
| 发展历程 | 2015→2026 三阶段 |
| 校区联系 | 桥西 / 新华 / 长安 / 高新 4 校区与老师电话 |
| 预约表单 | 提交体验预约线索（`/api/lead`） |

---

## 三、数据库初始化（Supabase）

在 Supabase 控制台 → SQL Editor 执行：

```sql
-- 用户表（未来注册账号用）
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(20) UNIQUE,
  wechat_openid VARCHAR(64) UNIQUE,
  student_name VARCHAR(50),
  grade VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 免费体验预约线索表（当前即刻可用）
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  lead_type VARCHAR(50),   -- 学习力体检 / 单词速记体验 / 中考技巧体验 / 低价体验课预约
  subject VARCHAR(20),     -- 数学 / 英语 / 物理 / 化学 ...
  campus VARCHAR(50),      -- 桥西 / 新华 / 长安 / 高新
  phone VARCHAR(20) NOT NULL,
  name VARCHAR(50),
  grade VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending',  -- pending / contacted / completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

> 建议为 `leads` 表开启 RLS，并使用 Service Role Key（仅服务端）写入，避免前端越权。

---

## 四、环境变量

复制 `.env.example` 为 `.env.local` 并填入：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxx   # 仅服务端，切勿暴露
```

- **已配置**：预约表单真实写入 `leads` 表。
- **未配置（留空）**：API 自动降级为「模拟写入」（仅服务端打印日志并返回成功），页面可先上线。

---

## 五、部署（GitHub + Vercel，0 成本）

1. **建仓库**：在 GitHub 新建 `huisuxue-web`，将本目录推送。
2. **关联 Vercel**：用 GitHub 登录 [Vercel](https://vercel.com) → Import Project → 选择该仓库，每次 `git push` 自动部署。
3. **配置环境变量**：Vercel 项目 → Settings → Environment Variables，填入上方 Supabase 三项。
4. **（可选）绑定域名**：在 Vercel 添加自定义域名；若需微信网页授权(OAuth)获取 OpenID，域名须有国内 ICP 备案（初期用「手机号注册」即可绕过）。

---

## 六、微信服务号对接

1. **自定义菜单**：公众号后台「内容与互动 → 自定义菜单」，菜单选「跳转网页」填入 Vercel 链接（如 `https://huisuxue.vercel.app`），无需备案即可用。
2. **关注自动回复**：引导用户点击菜单栏「20min免费体验」。
3. **线索提醒**：家长提交预约后，后端 API 可调用微信模板消息 / 企业微信机器人，推送到老师手机。

---

## 七、目录结构

```
app/
  layout.js          # 根布局 + SEO 元信息
  page.js            # 落地页主组件（含预约表单交互）
  globals.css        # 全站响应式样式
  api/lead/route.js  # 预约线索提交接口（Supabase 集成 + 降级）
.env.example         # 环境变量示例
package.json         # 依赖与脚本
```

---

© 慧速学AI伴学中心 · 中学全科托管 · AI极智考
