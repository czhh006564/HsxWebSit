"use client";

import { useEffect, useState } from "react";

const PILLARS = [
  {
    icon: "🧠",
    tag: "单词才是硬通货",
    title: "AI单词速记",
    desc: "以海马体记忆为理论，10个一组、60词/小时，多形式强化记忆，3天背完3年单词。",
    price: "按书籍单词量收费",
    points: ["海马体速记 + 词性拆解", "现场抽测，效果可见", "口号：相信自己可以创造奇迹"],
  },
  {
    icon: "🎯",
    tag: "只学不会的",
    title: "AI满分导航",
    desc: "AI测试定位薄弱点→生成报告→规划专属学习路径，只学不会的，不浪费一分钟。",
    price: "699 元 / 科 / 月",
    points: ["知识测试 + 定制报告", "知识视频 + 针对练习", "可叠加真人伴学（可选）"],
  },
  {
    icon: "📝",
    tag: "考试有技巧",
    title: "AI中高考答题技巧",
    desc: "命题人视角总结高频考点答题技巧，会题快10倍，不会题也能做对。",
    price: "699 元 / 科 / 月",
    points: ["中高考高频考点", "快速答题技巧体系", "口号：只学要考的"],
  },
  {
    icon: "🤝",
    tag: "三种伴学形式",
    title: "AI智能伴学系统",
    desc: "排除走神、不懂装懂等不良因素，提供有监督的伴学服务，自主选择形式。",
    price: "线下 180元/小时 · 线上 150元/90分钟",
    points: ["AI伴学（免费）", "线上伴学（真人）", "线下伴学（真人面对面）"],
  },
];

const PROBLEMS = [
  {
    title: "AI满分导航 · 解决盲目学习",
    items: [
      "盲目学习导致精力浪费、效果低下，引发厌学逆反",
      "上了很多班/一对一成绩仍不提升，又不敢停",
      "中高考前几个月，缺的多却不知从哪补起",
    ],
  },
  {
    title: "AI单词速记 · 激活海马体",
    items: [
      "多种原因导致的单词记忆困难",
      "没方法讨厌单词，词汇量严重不达标",
      "单词是12年累计的“硬通货”，影响全学科",
    ],
  },
  {
    title: "中高考答题技巧 · 直接提分",
    items: [
      "临近中高考的考前突击",
      "得分率卡在90%无法突破的优等生",
      "中高难度题目拿不到分",
    ],
  },
  {
    title: "AI智能伴学 · 保障效率",
    items: [
      "排除走神、不懂装懂、注意力不集中",
      "学习问题不能解决、方法不正确",
      "学习总结不到位、过程枯燥",
    ],
  },
];

const FREE_LEADS = [
  {
    type: "学习力免费体检",
    leadSelect: "学习力体检",
    kind: "free",
    price: "0 元",
    unit: "20 分钟",
    slogan: "孩子和学霸之间只差这份体检报告",
    lines: ["数学/英语/物理/化学", "知识·能力·技巧三维体检", "最短路径 + 最小内容建议"],
    items: ["全面体检报告", "专属学习建议"],
  },
  {
    type: "免费单词速记体验",
    leadSelect: "单词速记体验",
    kind: "free",
    price: "0 元",
    unit: "20 分钟",
    slogan: "3天时间背完3年单词",
    lines: ["学习生词约20个", "海马体 + 词性拆解速记法", "现场抽测 + 复习文件"],
    items: ["不是记不住，是方法错了", "单词是12年学习的硬通货"],
  },
  {
    type: "免费中考技巧体验",
    leadSelect: "中考技巧体验",
    kind: "free",
    price: "0 元",
    unit: "20 分钟",
    slogan: "会题快10倍，不会题能做对",
    lines: ["体验3个技巧，当场感受", "中考技巧对应图", "数学/英语/物理/化学"],
    items: ["学习有方法，考试有技巧", "学霸都在用，只是你不知道"],
  },
];

const PAID_LEADS = [
  {
    type: "线下1对1单词速记课",
    kind: "paid",
    price: "49.9 元",
    unit: "60分钟+7天打卡",
    slogan: "3天时间背完3年单词",
    lines: ["约60个生词", "海马体+词性拆解速记法", "现场抽测 + 复习文件"],
  },
  {
    type: "线下1对1学科检测+规划",
    kind: "paid",
    price: "19.9 元",
    unit: "60 分钟",
    slogan: "只学不会的，最少、质优、效果好",
    lines: ["数学/英语/物理/化学", "三维全面体检", "报告解读 + 学习方案规划"],
  },
  {
    type: "线下1对1中考技巧",
    kind: "paid",
    price: "69.9 元",
    unit: "60 分钟",
    slogan: "会题快10倍，不会题能做对",
    lines: ["中考压轴题模型", "中考技巧对应图", "数学/英语/物理/化学"],
  },
  {
    type: "线上1对1单词速记课",
    kind: "paid",
    price: "49.9 元",
    unit: "60分钟+抗遗忘",
    slogan: "3天时间背完3年单词",
    lines: ["约30个生词", "1次正课+2次抗遗忘", "现场抽测 + 复习文件"],
  },
  {
    type: "线上1对1学习课",
    kind: "paid",
    price: "59.9 元",
    unit: "60+30 分钟",
    slogan: "数学/英语/物理/化学",
    lines: ["1次正课 + 1次复习课", "精准定位薄弱点"],
  },
  {
    type: "198全家桶 / 新人99",
    kind: "paid",
    price: "198 / 99 元",
    unit: "超值组合",
    slogan: "全家桶原价948.5，仅198",
    lines: ["线上+线下多节1对1", "一个月系统使用", "新人99/月/科（限1次）"],
  },
];

const CAMPUSES = [
  { name: "桥西校区", addr: "益友百货B座12层", teacher: "于老师", phone: "18631199225" },
  { name: "新华校区", addr: "28中对面", teacher: "李老师", phone: "18633499596" },
  { name: "长安校区", addr: "翟营大街上东领寓B座6层", teacher: "刘老师", phone: "13073112715" },
  { name: "高新校区", addr: "黄河大道118号新华大厦17层", teacher: "崔老师", phone: "13223402764" },
];

const TIMELINE = [
  { y: "2015—2019", t: "作业辅导", d: "面向家长的公众号，服务中小学生作业辅导" },
  { y: "2019—2022", t: "校内系统", d: "面向学校老师的校内学习管理系统建设" },
  { y: "2022—2026", t: "AI极智考", d: "AI赋能学习全过程，助力高效学习、快速提分" },
];

function smoothTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Page() {
  const [navOpen, setNavOpen] = useState(false);
  const [form, setForm] = useState({
    leadType: "学习力体检",
    subject: "数学",
    campus: "桥西校区",
    phone: "",
    name: "",
    grade: "",
  });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMsg({ type: "", text: "" });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setMsg({ type: "ok", text: data.msg || "提交成功！" });
        setForm((f) => ({ ...f, phone: "", name: "", grade: "" }));
      } else {
        setMsg({ type: "err", text: data.msg || "提交失败，请稍后再试" });
      }
    } catch {
      setMsg({ type: "err", text: "网络异常，请稍后再试" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* ===== Header ===== */}
      <header className="site-header">
        <div className="container nav">
          <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); smoothTo("top"); }}>
            <span className="logo">慧</span>
            <span>
              慧速学AI伴学中心
              <small>AI赋能学习 · 提分立杆见影</small>
            </span>
          </a>
          <nav className={`nav-links ${navOpen ? "open" : ""}`}>
            <a href="#business" onClick={() => setNavOpen(false)}>核心业务</a>
            <a href="#mode" onClick={() => setNavOpen(false)}>学习模式</a>
            <a href="#free" onClick={() => setNavOpen(false)}>免费体验</a>
            <a href="#campus" onClick={() => setNavOpen(false)}>校区联系</a>
          </nav>
          <div className="nav-cta">
            <a className="btn btn-primary" href="#signup" onClick={(e) => { e.preventDefault(); smoothTo("signup"); }}>免费预约体验</a>
            <button className="nav-toggle" aria-label="菜单" onClick={() => setNavOpen((v) => !v)}>☰</button>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <div className="section-head" style={{ textAlign: "left", margin: "0 0 18px" }}>
              <span className="eyebrow">中学全科托管 · AI极智考</span>
            </div>
            <h1>
              用 <span className="hl">AI</span> 赋能学习全过程<br />
              让每一分努力都有<span className="hl">分数回报</span>
            </h1>
            <div className="slogans">
              <span>AI赋能学习 提分立杆见影</span>
              <span>学习有方法 考试有技巧</span>
              <span>只学不会的</span>
            </div>
            <p className="lead">
              慧速学AI伴学中心采用「AI规划 + 真人伴学」模式，用明确结果验证学习效果——
              单词背完由家长抽测达标才算交付，精准学完成由试卷测评达标才算完成。
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#signup" onClick={(e) => { e.preventDefault(); smoothTo("signup"); }}>立即免费体验 20 分钟</a>
              <a className="btn btn-ghost" href="#business" onClick={(e) => { e.preventDefault(); smoothTo("business"); }}>了解四大业务</a>
            </div>
            <div className="hero-stats">
              <div className="stat"><strong>500+</strong><span>累计服务学员</span></div>
              <div className="stat"><strong>50+</strong><span>中考提分（分）</span></div>
              <div className="stat"><strong>200+</strong><span>单词速记服务</span></div>
              <div className="stat"><strong>4</strong><span>直营校区</span></div>
            </div>
          </div>

          <div className="hero-card reveal">
            <h3>四大核心业务</h3>
            <p className="sub">覆盖「记单词 · 补薄弱 · 练技巧 · 强伴学」全链路</p>
            <div className="mini-services">
              <div className="ms"><span className="ico">🧠</span><div><b>AI单词速记</b><small>3天背完3年单词</small></div></div>
              <div className="ms"><span className="ico">🎯</span><div><b>AI满分导航</b><small>699/科/月 · 只学不会的</small></div></div>
              <div className="ms"><span className="ico">📝</span><div><b>AI中高考答题技巧</b><small>699/科/月 · 会题快10倍</small></div></div>
              <div className="ms"><span className="ico">🤝</span><div><b>AI智能伴学系统</b><small>线上150 / 线下180</small></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 四大核心业务 ===== */}
      <section id="business">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">核心业务</span>
            <h2>四大业务，精准解决学习痛点</h2>
            <p>AI规划 + 真人伴学，从单词、薄弱点到答题技巧，再到全程监督陪伴。</p>
          </div>
          <div className="cards">
            {PILLARS.map((p) => (
              <div className="card reveal" key={p.title}>
                <div className="top">
                  <span className="badge">{p.icon}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <span className="tag">{p.tag}</span>
                  </div>
                </div>
                <p>{p.desc}</p>
                <span className="price">{p.price}</span>
                <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 核心学习模式 ===== */}
      <section id="mode" className="section-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">核心学习模式</span>
            <h2>AI规划 + 真人伴学 = 1+1&gt;2</h2>
            <p>既具备 AI 的客观、精准、高效，又具备真人的互动、情绪调节与及时点拨。</p>
          </div>
          <div className="mode-grid">
            <div className="mode-visual reveal">
              <div className="flow">
                <div className="node"><span className="dot" /> <div><b>AI 智能规划</b><span style={{ display: "block", color: "var(--muted)", fontSize: 12 }}>客观 · 精准 · 高效定位薄弱点</span></div></div>
                <div className="plus">＋</div>
                <div className="node"><span className="dot" style={{ background: "var(--accent)" }} /> <div><b>真人同步伴学</b><span style={{ display: "block", color: "var(--muted)", fontSize: 12 }}>互动 · 点拨 · 情绪与状态调节</span></div></div>
              </div>
            </div>
            <div className="mode-list reveal">
              <div className="item"><span className="k">师</span><div><b>一线老师</b><span>一线机构/学校多年教学经验老师</span></div></div>
              <div className="item"><span className="k">研</span><div><b>专业伴学师</b><span>经会数学认证与培训的专业研究生</span></div></div>
              <div className="item"><span className="k">家</span><div><b>学生家长</b><span>经中心培训可对自家孩子家庭伴学</span></div></div>
              <div className="item"><span className="k">✓</span><div><b>过程透明</b><span>摈弃评价不准、内容不精准、过程不透明</span></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 解决什么问题 ===== */}
      <section id="problems">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">解决什么问题</span>
            <h2>不是不努力，是方法错了</h2>
            <p>每一个业务都对应一类真实的学习困境。</p>
          </div>
          <div className="problems">
            {PROBLEMS.map((p) => (
              <div className="problem reveal" key={p.title}>
                <h4>{p.title}</h4>
                <ul>{p.items.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 免费引流 ===== */}
      <section id="free" className="section-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">免费引流</span>
            <h2>3 大免费体验，20 分钟看见效果</h2>
            <p>现场抽测、当场感受，用结果说话。</p>
          </div>
          <div className="lead-grid">
            {FREE_LEADS.map((c) => (
              <div className={`lead-card ${c.kind} reveal`} key={c.type}>
                <span className="kind">免费</span>
                <h4>{c.type}</h4>
                <div className="price-big">{c.price}</div>
                <div className="line">⏱ {c.unit}</div>
                <div className="slogans3">“{c.slogan}”</div>
                {c.lines.map((l) => <div className="line" key={l}>· {l}</div>)}
                <ul>{c.items.map((i) => <li key={i}>{i}</li>)}</ul>
                <a className="btn btn-primary" style={{ width: "100%", marginTop: 14 }} href="#signup" onClick={(e) => { e.preventDefault(); setForm((f) => ({ ...f, leadType: c.leadSelect })); smoothTo("signup"); }}>预约此体验</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 低价引流 ===== */}
      <section id="paid">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">低价引流</span>
            <h2>1 对 1 低价课，先体验再决定</h2>
            <p>线下 19.9 起，线上 49.9 起，全家桶仅 198。</p>
          </div>
          <div className="lead-grid">
            {PAID_LEADS.map((c) => (
              <div className={`lead-card ${c.kind} reveal`} key={c.type}>
                <span className="kind">低价</span>
                <h4>{c.type}</h4>
                <div className="price-big">{c.price}</div>
                <div className="line">⏱ {c.unit}</div>
                <div className="slogans3">“{c.slogan}”</div>
                {c.lines.map((l) => <div className="line" key={l}>· {l}</div>)}
                <a className="btn btn-ghost" style={{ width: "100%", marginTop: 14 }} href="#signup" onClick={(e) => { e.preventDefault(); smoothTo("signup"); }}>预约此课程</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 发展历程 ===== */}
      <section className="section-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">发展历程</span>
            <h2>十年深耕，从作业辅导到 AI 极智考</h2>
          </div>
          <div className="cards">
            {TIMELINE.map((t) => (
              <div className="card reveal" key={t.y} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "var(--brand)" }}>{t.y}</div>
                <h3 style={{ marginTop: 8 }}>{t.t}</h3>
                <p>{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 校区与联系 ===== */}
      <section id="campus">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">校区与联系</span>
            <h2>4 大校区，就近伴学</h2>
            <p>欢迎到店体验，或电话/微信预约免费测评。</p>
          </div>
          <div className="campus-grid">
            {CAMPUSES.map((c) => (
              <div className="campus reveal" key={c.name}>
                <div className="info">
                  <b>{c.name}</b>
                  <span>{c.addr}</span>
                </div>
                <div className="tel">
                  <a href={`tel:${c.phone}`}>{c.phone}</a>
                  <small>{c.teacher}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 预约表单 ===== */}
      <section id="signup" className="section-alt">
        <div className="container signup">
          <div className="signup-copy reveal">
            <h3>免费预约 20 分钟体验</h3>
            <p>填写信息，老师会在 1 个工作日内与您联系，安排到店或线上体验。</p>
            <ul className="perks">
              <li><span className="ck">✓</span><span>免费学习力体检 / 单词速记 / 中考技巧三选一</span></li>
              <li><span className="ck">✓</span><span>现场抽测，效果看得见</span></li>
              <li><span className="ck">✓</span><span>生成专属体检报告与学习建议</span></li>
              <li><span className="ck">✓</span><span>不推销、不套路，用结果说话</span></li>
            </ul>
          </div>
          <div className="form-card reveal">
            <form onSubmit={submit}>
              <div className="field">
                <label>体验类型 *</label>
                <select value={form.leadType} onChange={(e) => setForm({ ...form, leadType: e.target.value })}>
                  <option value="学习力体检">免费学习力体检</option>
                  <option value="单词速记体验">免费单词速记体验</option>
                  <option value="中考技巧体验">免费中考技巧体验</option>
                  <option value="低价体验课预约">低价 1 对 1 体验课</option>
                </select>
              </div>
              <div className="field">
                <label>科目</label>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                  <option>数学</option><option>英语</option><option>物理</option>
                  <option>化学</option><option>语文</option><option>其他</option>
                </select>
              </div>
              <div className="field">
                <label>意向校区 *</label>
                <select value={form.campus} onChange={(e) => setForm({ ...form, campus: e.target.value })}>
                  {CAMPUSES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="field">
                <label>手机号 *</label>
                <input type="tel" inputMode="numeric" placeholder="用于老师回电联系" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="field">
                <label>学生姓名（选填）</label>
                <input placeholder="如：小明" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="field">
                <label>年级（选填）</label>
                <input placeholder="如：初三" value={form.grade}
                  onChange={(e) => setForm({ ...form, grade: e.target.value })} />
              </div>
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {submitting ? "提交中…" : "提交预约"}
              </button>
              <div className={`form-msg ${msg.type}`}>{msg.text}</div>
              <p className="form-note">提交即表示同意老师与您电话联系，信息仅用于课程预约。</p>
            </form>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand-f"><span className="logo">慧</span>慧速学AI伴学中心</div>
            <p>用 AI 赋能学生学习全过程，助力高效学习、快速提分。<br />孩子的每一分努力，都应有考试分数的回报。</p>
          </div>
          <div>
            <h4>核心业务</h4>
            <a href="#business" onClick={(e) => { e.preventDefault(); smoothTo("business"); }}>AI单词速记</a>
            <a href="#business" onClick={(e) => { e.preventDefault(); smoothTo("business"); }}>AI满分导航</a>
            <a href="#business" onClick={(e) => { e.preventDefault(); smoothTo("business"); }}>AI中高考答题技巧</a>
            <a href="#business" onClick={(e) => { e.preventDefault(); smoothTo("business"); }}>AI智能伴学系统</a>
          </div>
          <div>
            <h4>联系我们</h4>
            <a href="tel:18631199225">桥西·于老师 18631199225</a>
            <a href="tel:18633499596">新华·李老师 18633499596</a>
            <a href="tel:13073112715">长安·刘老师 13073112715</a>
            <a href="tel:13223402764">高新·崔老师 13223402764</a>
          </div>
        </div>
        <div className="container footer-bottom">
          © {new Date().getFullYear()} 慧速学AI伴学中心 · 中学全科托管 · AI极智考　|　冀ICP备暂无（部署后补充）
        </div>
      </footer>
    </>
  );
}
