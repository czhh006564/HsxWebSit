import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://huisuxue.vercel.app"),
  title: {
    default: "慧速学AI伴学中心 | AI赋能学习 提分立杆见影",
    template: "%s | 慧速学AI伴学中心",
  },
  description:
    "慧速学AI伴学中心 · 中学全科托管。AI规划+真人伴学，四大核心业务：AI单词速记、AI满分导航、AI中高考答题技巧、AI智能伴学系统。3天背完3年单词，只学不会的，快速提分。",
  keywords: [
    "慧速学",
    "AI伴学",
    "AI单词速记",
    "AI满分导航",
    "中高考答题技巧",
    "中学全科托管",
    "快速提分",
  ],
  openGraph: {
    title: "慧速学AI伴学中心 | AI赋能学习 提分立杆见影",
    description: "AI规划+真人伴学，只学不会的，快速提分。3天背完3年单词。",
    type: "website",
    locale: "zh_CN",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
