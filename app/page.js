"use client";

import { useEffect, useRef, useState } from "react";

const FREE_EXP = [
  {
    type: "学习力免费体检",
    leadSelect: "学习力体检",
    desc: "数学/英语/物理/化学，知识·能力·技巧三维体检，20 分钟看清问题",
    tag: "20 分钟",
  },
  {
    type: "免费 AI 单词速记体验",
    leadSelect: "单词速记体验",
    desc: "现场学约 20 个生词，海马体+词性拆解速记法，当场抽测",
    tag: "20 分钟",
  },
  {
    type: "免费中高考技巧体验",
    leadSelect: "中考技巧体验",
    desc: "体验 3 个答题技巧，数学/英语/物理/化学，当场感受提分",
    tag: "20 分钟",
  },
];

const CAMPUSES = [
  { name: "历下校区", addr: "历下区·花园路·xx 号", tel: "155 5319 1968" },
  { name: "市中校区", addr: "市中区·经四路·xx 号", tel: "155 5319 1968" },
  { name: "槐荫校区", addr: "槐荫区·经十路·xx 号", tel: "155 5319 1968" },
  { name: "天桥校区", addr: "天桥区·无影山·xx 号", tel: "155 5319 1968" },
];

export default function Page() {
  const [menu, setMenu] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    grade: "",
    campus: "",
    leadType: "学习力体检",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null); // { type: "ok" | "err", text }

  const smoothTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
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
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if (!/^1[3-9]\d{9}$/.test(form.phone)) {
      setMsg({ type: "err", text: "请输入正确的 11 位手机号" });
      return;
    }
    if (!form.campus) {
      setMsg({ type: "err", text: "请选择意向校区" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name || "未填写",
          phone: form.phone,
          grade: form.grade || "未填写",
          campus: form.campus,
          leadType: form.leadType,
          note: form.note || "",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg({ type: "ok", text: "预约成功！老师会尽快与您联系，请保持手机畅通 📞" });
        setForm((f) => ({ ...f, name: "", phone: "", grade: "", note: "" }));
      } else {
        setMsg({ type: "err", text: data.error || "提交失败，请稍后重试或直接拨打老师电话" });
      }
    } catch {
      setMsg({ type: "err", text: "网络异常，请稍后重试或直接拨打老师电话" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* 固定导航 */}
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); smoothTo("home"); }}>
            <span className="brand-mark">慧</span>
            <span className="brand-text">慧速学<small>AI 伴学中心</small></span>
          </a>
          <nav className={`nav-links ${menu ? "open" : ""}`}>
            <a href="#why" onClick={(e) => { e.preventDefault(); smoothTo("why"); setMenu(false); }}>学习方法</a>
            <a href="#nav" onClick={(e) => { e.preventDefault(); smoothTo("nav"); setMenu(false); }}>核心业务</a>
            <a href="#proof" onClick={(e) => { e.preventDefault(); smoothTo("proof"); setMenu(false); }}>提分效果</a>
            <a href="#campus" onClick={(e) => { e.preventDefault(); smoothTo("campus"); setMenu(false); }}>校区</a>
            <a className="nav-cta" href="#signup" onClick={(e) => { e.preventDefault(); smoothTo("signup"); setMenu(false); }}>免费体验</a>
          </nav>
          <button className="nav-toggle" aria-label="菜单" onClick={() => setMenu((m) => !m)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* 1. 首屏品牌 */}
      <section className="screen hero" id="home">
        <div className="container hero-grid">
          <div className="hero-text">
            <span className="eyebrow">中学全科 · AI 智能伴学</span>
            <h1>AI 精准分析<br />个性化规划<br />真人伴学</h1>
            <p className="lead">
              慧速学用 AI 赋能学习全过程：精准诊断知识漏洞、生成专属学习路径，并由真人老师陪伴落地。
              不是更努力，而是更聪明地学习。
            </p>
            <div className="hero-cta">
              <a className="btn btn-accent" href="#signup" onClick={(e) => { e.preventDefault(); setForm((f) => ({ ...f, leadType: "学习力体检" })); smoothTo("signup"); }}>免费预约体验</a>
              <a className="btn btn-ghost-light" href="#why" onClick={(e) => { e.preventDefault(); smoothTo("why"); }}>了解方法</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="report-card">
              <div className="rc-head">
                <span>学习力诊断报告</span>
                <span className="rc-score">86<small>分</small></span>
              </div>
              <div className="rc-bars">
                <div className="rc-bar"><i style={{ width: "82%" }} /><span>英语</span></div>
                <div className="rc-bar"><i style={{ width: "64%" }} /><span>数学</span></div>
                <div className="rc-bar"><i style={{ width: "73%" }} /><span>物理</span></div>
                <div className="rc-bar"><i style={{ width: "58%" }} /><span>化学</span></div>
              </div>
              <div className="rc-path">
                <span>最短提分路径</span>
                <div className="rc-steps">
                  <em>补缺</em><em>技巧</em><em>巩固</em><em>冲刺</em>
                </div>
              </div>
            </div>
            <div className="hud">
              <span>AI 学习力诊断 · 实时生成</span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="screen-img reveal">
            <img src="/img/A_modern_AI_education_technolo_2026-07-27T14-58-59.png" alt="AI 智能学习场景" loading="lazy" />
            <span className="cap">AI 精准分析 + 真人伴学，让每一分努力都有回报</span>
          </div>
        </div>
      </section>

      {/* 2. 家长痛点 */}
      <section className="screen" id="pain">
        <div className="container">
          <div className="section-head">
            <span className="kicker">为什么孩子努力却没效果</span>
            <h2>不是孩子不努力，是方法没找对</h2>
          </div>
          <div className="screen-img reveal">
            <img src="/img/A_worried_Chinese_parent_and_c_2026-07-27T14-59-01.png" alt="家长与孩子的学习焦虑" loading="lazy" />
            <span className="cap">很多努力，却看不到提升——问题往往不在努力，而在方法</span>
          </div>
          <div className="pain-grid">
            {[
              { t: "熬夜刷题成绩却原地踏步", d: "时间花了，分数没动，越学越没信心" },
              { t: "报了很多班还是不会做", d: "大班统一讲，孩子听不懂的没人补" },
              { t: "知识点越漏越多", d: "前面没懂，后面更难，恶性循环" },
              { t: "考试总是发挥失常", d: "会做的丢分，不会的干瞪眼" },
            ].map((p) => (
              <div className="pain-card reveal" key={p.t}>
                <div className="pain-ico">!</div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
          <p className="pain-quote reveal">真正的差距，不是谁更努力，而是谁先看清问题。</p>
        </div>
      </section>

      {/* 3. 解决方案 */}
      <section className="screen dark" id="why">
        <div className="container">
          <div className="section-head light">
            <span className="kicker">慧速学的解法</span>
            <h2>先看清问题，再精准解决</h2>
          </div>
          <div className="screen-img reveal">
            <img src="/img/Split_comparison_illustration__2026-07-27T14-59-02.png" alt="传统学习 vs AI 学习" loading="lazy" />
            <span className="cap">从「老师讲什么学什么」，到「先发现问题再精准学习」</span>
          </div>
          <div className="vs-wrap">
            <div className="vs-card vs-old reveal">
              <h3>传统方式</h3>
              <ul>
                <li>老师讲什么，孩子学什么</li>
                <li>大量重复已会的内容</li>
                <li>漏洞靠考试才发现</li>
                <li>提分慢、效率低</li>
              </ul>
            </div>
            <div className="vs-mid reveal">VS</div>
            <div className="vs-card vs-new reveal">
              <h3>慧速学 AI 伴学</h3>
              <ul>
                <li>AI 先检测知识漏洞</li>
                <li>只学不会的内容</li>
                <li>学习路径实时调整</li>
                <li>真人伴学落地执行</li>
              </ul>
            </div>
          </div>
          <div className="flow reveal">
            <div className="flow-step"><span>01</span>精准检测</div>
            <div className="flow-step"><span>02</span>个性规划</div>
            <div className="flow-step"><span>03</span>真人伴学</div>
            <div className="flow-step"><span>04</span>效果追踪</div>
          </div>
        </div>
      </section>

      {/* 4. 核心模式 */}
      <section className="screen" id="mode">
        <div className="container">
          <div className="section-head">
            <span className="kicker">核心模式</span>
            <h2>AI 规划 + 真人伴学 = 1 + 1 &gt; 2</h2>
            <p className="sub">AI 负责精准与效率，真人负责陪伴与落地，两者缺一不可。</p>
          </div>
          <div className="screen-img reveal">
            <img src="/img/A_human_tutor_or_teacher_guidi_2026-07-27T14-59-03.png" alt="真人老师陪伴指导" loading="lazy" />
            <span className="cap">AI 精准规划 + 真人老师陪伴，学习效果 1+1&gt;2</span>
          </div>
          <div className="mode-grid">
            <div className="mode-card reveal">
              <div className="mode-ico ai">AI</div>
              <h3>AI 精准规划</h3>
              <p>检测漏洞、生成最短提分路径、智能推送练习与复习，让学习有迹可循。</p>
            </div>
            <div className="mode-card reveal">
              <div className="mode-ico person">师</div>
              <h3>真人伴学落地</h3>
              <p>一线老师与专业伴学师陪伴执行，答疑解惑、督促节奏、调整状态。</p>
            </div>
            <div className="mode-card reveal">
              <div className="mode-ico family">家</div>
              <h3>家长看得见的成长</h3>
              <p>学习报告同步家长，每次进步都清晰可见，不再焦虑等待考试成绩。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI 满分导航 */}
      <section className="screen" id="nav">
        <div className="container">
          <div className="screen-img reveal">
            <img src="/img/A_glowing_AI_analytics_dashboa_2026-07-27T14-59-04.png" alt="AI 学习分析报告" loading="lazy" />
            <span className="cap">AI 满分导航：先检测、再规划，只学不会的内容</span>
          </div>
          <div className="biz reveal">
            <div className="biz-text">
              <span className="kicker">核心业务 01</span>
              <h2>AI 满分导航</h2>
              <p className="price">699 元 / 科 / 月</p>
              <p className="desc">AI 精准检测知识漏洞，按「最短路径、最小内容」生成专属学习规划，只学不会的，把时间花在提分最快的地方。</p>
              <ul className="biz-points">
                <li>知识·能力·技巧三维检测</li>
                <li>每日学习任务智能推送</li>
                <li>错题归因 + 同类题强化</li>
                <li>真人伴学师跟踪执行</li>
              </ul>
              <a className="btn btn-accent" href="#signup" onClick={(e) => { e.preventDefault(); setForm((f) => ({ ...f, leadType: "AI满分导航" })); smoothTo("signup"); }}>预约免费体验</a>
            </div>
            <div className="biz-media">
              <div className="media-card">
                <div className="mc-title">本周学习路径</div>
                <div className="mc-row"><span>函数零点</span><b className="hot">重点补</b></div>
                <div className="mc-row"><span>几何证明</span><b>巩固</b></div>
                <div className="mc-row"><span>概率统计</span><b>已掌握</b></div>
                <div className="mc-foot">预计节省 60% 重复练习</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 看见问题（学习报告） */}
      <section className="screen" id="report">
        <div className="container">
          <div className="screen-img reveal">
            <img src="/img/A_detailed_math_diagnostic_rep_2026-07-27T14-59-50.png" alt="数学能力诊断报告" loading="lazy" />
            <span className="cap">用报告看清：孩子哪里薄弱、为什么失分、如何提升</span>
          </div>
          <div className="biz rev reveal">
            <div className="biz-media">
              <div className="media-card report">
                <div className="mc-title">学习力诊断报告</div>
                <div className="mc-bar"><i style={{ width: "48%" }} /><span>知识掌握 48%</span></div>
                <div className="mc-bar"><i style={{ width: "62%" }} /><span>解题能力 62%</span></div>
                <div className="mc-bar"><i style={{ width: "55%" }} /><span>答题技巧 55%</span></div>
                <div className="mc-foot">薄弱点：函数 · 受力分析 · 完形逻辑</div>
              </div>
            </div>
            <div className="biz-text">
              <span className="kicker">核心业务 02</span>
              <h2>看见真问题</h2>
              <p className="desc">一份报告，把「学不会」说清楚：是知识没懂、能力不够，还是技巧不会。问题看得见，提分才可行。</p>
              <ul className="biz-points">
                <li>三维诊断，定位真因</li>
                <li>薄弱点清单化</li>
                <li>给最短学习路径</li>
                <li>家长老师同频跟进</li>
              </ul>
              <a className="btn btn-accent" href="#signup" onClick={(e) => { e.preventDefault(); setForm((f) => ({ ...f, leadType: "学习力体检" })); smoothTo("signup"); }}>免费做一次体检</a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AI 单词速记 */}
      <section className="screen" id="word">
        <div className="container">
          <div className="screen-img reveal">
            <img src="/img/A_teenage_student_memorizing_E_2026-07-27T14-59-32.png" alt="AI 单词速记" loading="lazy" />
            <span className="cap">海马体记忆法，3 天背完 3 年核心单词</span>
          </div>
          <div className="biz reveal">
            <div className="biz-text">
              <span className="kicker">核心业务 03</span>
              <h2>AI 单词速记</h2>
              <p className="desc">用海马体记忆规律 + 词性拆解 + 智能复习曲线，告别死记硬背。单词是 12 年学习的硬通货，记不住，先换方法。</p>
              <ul className="biz-points">
                <li>每小时掌握约 60 个生词</li>
                <li>词根词性拆解，记得牢</li>
                <li>遗忘点智能提醒复习</li>
                <li>3 天体验，当场抽测</li>
              </ul>
              <a className="btn btn-accent" href="#signup" onClick={(e) => { e.preventDefault(); setForm((f) => ({ ...f, leadType: "单词速记体验" })); smoothTo("signup"); }}>预约单词体验</a>
            </div>
            <div className="biz-media">
              <div className="media-card">
                <div className="mc-title">今日速记</div>
                <div className="mc-row"><span>abandon → 放弃</span><b className="hot">新学</b></div>
                <div className="mc-row"><span>benefit → 益处</span><b className="hot">新学</b></div>
                <div className="mc-row"><span>consider → 考虑</span><b>复习</b></div>
                <div className="mc-foot">已掌握 120 / 今日目标 60</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. AI 中高考答题技巧 */}
      <section className="screen" id="exam">
        <div className="container">
          <div className="screen-img reveal">
            <img src="/img/A_student_taking_an_exam_with__2026-07-27T14-59-33.png" alt="中高考答题技巧" loading="lazy" />
            <span className="cap">会题做得更快，不会题也能提高得分率</span>
          </div>
          <div className="biz rev reveal">
            <div className="biz-media">
              <div className="media-card">
                <div className="mc-title">答题技巧对应图</div>
                <div className="mc-row"><span>选择题</span><b className="hot">排除·代入</b></div>
                <div className="mc-row"><span>填空题</span><b>逆向·特值</b></div>
                <div className="mc-row"><span>大题</span><b>步骤·踩分</b></div>
                <div className="mc-foot">数学/英语/物理/化学 通用</div>
              </div>
            </div>
            <div className="biz-text">
              <span className="kicker">核心业务 04</span>
              <h2>AI 中高考答题技巧</h2>
              <p className="price">699 元 / 科 / 月</p>
              <p className="desc">学习有方法，考试有技巧。会做的题做得更快更准，暂时不会的题也能用技巧多拿分。学霸都在用，只是你不知道。</p>
              <ul className="biz-points">
                <li>选择题快速排除法</li>
                <li>大题步骤踩分术</li>
                <li>时间分配与检查策略</li>
                <li>真题实战演练</li>
              </ul>
              <a className="btn btn-accent" href="#signup" onClick={(e) => { e.preventDefault(); setForm((f) => ({ ...f, leadType: "中考技巧体验" })); smoothTo("signup"); }}>预约技巧体验</a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. AI 智能伴学系统 */}
      <section className="screen" id="banxue">
        <div className="container">
          <div className="section-head">
            <span className="kicker">核心业务 05</span>
            <h2>AI 智能伴学系统</h2>
            <p className="sub">一套系统，三种陪伴方式，让孩子随时有人管、有人教、有人陪。</p>
          </div>
          <div className="screen-img reveal">
            <img src="/img/Three_small_scenes_of_student__2026-07-27T14-59-44.png" alt="三种伴学模式" loading="lazy" />
            <span className="cap">AI 伴学 / 线上真人 / 线下真人，总有一种适合孩子</span>
          </div>
          <div className="mode3">
            <div className="m3-card reveal">
              <h3>AI 自助伴学</h3>
              <p className="price">线上 150 元 / 月</p>
              <p>APP 随时学，AI 规划+推送+答疑，适合自律性较好的学生。</p>
            </div>
            <div className="m3-card reveal">
              <h3>线上真人伴学</h3>
              <p className="price">线上 150 元 / 月</p>
              <p>真人伴学师线上跟踪，远程答疑督学，打破地域限制。</p>
            </div>
            <div className="m3-card reveal">
              <h3>线下真人伴学</h3>
              <p className="price">线下 180 元 / 月</p>
              <p>到校区面对面伴学，老师实时答疑，氛围更专注。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. 品牌优势 */}
      <section className="screen" id="adv">
        <div className="container">
          <div className="section-head">
            <span className="kicker">为什么选慧速学</span>
            <h2>把提分这件事，做得更科学</h2>
          </div>
          <div className="screen-img reveal">
            <img src="/img/A_bright_modern_education_bran_2026-07-27T15-00-30.png" alt="慧速学学习中心" loading="lazy" />
            <span className="cap">专业教育品牌，用结果赢得家长信任</span>
          </div>
          <div className="adv-grid">
            {[
              { t: "更精准", d: "AI 检测漏洞，不做无效努力" },
              { t: "更高效", d: "只学不会的，省时间提分快" },
              { t: "更科学", d: "记忆曲线+认知规律做支撑" },
              { t: "有结果", d: "报告可追踪，进步看得见" },
            ].map((a) => (
              <div className="adv-card reveal" key={a.t}>
                <div className="adv-num">{a.t}</div>
                <p>{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. 效果验证 */}
      <section className="screen dark" id="proof">
        <div className="container">
          <div className="section-head light">
            <span className="kicker">效果验证</span>
            <h2>看得见的进步，才叫提分</h2>
          </div>
          <div className="screen-img reveal">
            <img src="/img/A_confident_successful_Chinese_2026-07-27T14-59-35.png" alt="提分学员" loading="lazy" />
            <span className="cap">真实学员：找到方法，成绩明显提升</span>
          </div>
          <div className="proof-stats">
            <div className="stat reveal"><b>3000+</b><span>累计服务学员</span></div>
            <div className="stat reveal"><b>92%</b><span>家长愿意推荐</span></div>
            <div className="stat reveal"><b>3 天</b><span>背完 3 年核心单词</span></div>
            <div className="stat reveal"><b>60%</b><span>减少重复练习</span></div>
          </div>
          <div className="case reveal">
            <div className="case-quote">“以前刷题到半夜也没用，做了学习力体检才知道是技巧问题。跟着规划走了一个月，月考数学提了 20 分。”</div>
            <div className="case-who">— 济南 · 初三学员家长</div>
          </div>
        </div>
      </section>

      {/* 12. 免费体验 + 预约表单 */}
      <section className="screen" id="signup">
        <div className="container">
          <div className="section-head">
            <span className="kicker">现在免费体验</span>
            <h2>20 分钟，看清孩子的提分空间</h2>
            <p className="sub">任选一项免费体验，到店即做、现场出报告，不花一分钱先看到效果。</p>
          </div>
          <div className="screen-img reveal">
            <img src="/img/A_friendly_teacher_welcoming_a_2026-07-27T15-00-31.png" alt="免费体验课" loading="lazy" />
            <span className="cap">20 分钟免费体验，现场抽测、效果看得见</span>
          </div>
          <div className="free3">
            {FREE_EXP.map((c) => (
              <div className="free-card reveal" key={c.type}>
                <span className="free-tag">{c.tag}</span>
                <h3>{c.type}</h3>
                <p>{c.desc}</p>
                <a
                  className="btn btn-accent"
                  href="#form"
                  onClick={(e) => { e.preventDefault(); setForm((f) => ({ ...f, leadType: c.leadSelect })); smoothTo("form"); }}
                >预约此体验</a>
              </div>
            ))}
          </div>

          <div className="signup-card reveal" id="form">
            <h3>填写信息，老师 1 对 1 联系您</h3>
            <form className="signup-form" onSubmit={submit}>
              <div className="field">
                <label>学生姓名</label>
                <input
                  type="text"
                  placeholder="选填"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="field">
                <label>手机号 *</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="11 位手机号"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <div className="field">
                <label>年级</label>
                <input
                  type="text"
                  placeholder="如：初三 / 高二"
                  value={form.grade}
                  onChange={(e) => setForm((f) => ({ ...f, grade: e.target.value }))}
                />
              </div>
              <div className="field">
                <label>意向校区 *</label>
                <select
                  value={form.campus}
                  onChange={(e) => setForm((f) => ({ ...f, campus: e.target.value }))}
                >
                  <option value="">请选择</option>
                  {CAMPUSES.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>体验项目</label>
                <select
                  value={form.leadType}
                  onChange={(e) => setForm((f) => ({ ...f, leadType: e.target.value }))}
                >
                  <option value="学习力体检">学习力免费体检</option>
                  <option value="单词速记体验">免费 AI 单词速记体验</option>
                  <option value="中考技巧体验">免费中高考技巧体验</option>
                  <option value="AI满分导航">AI 满分导航咨询</option>
                </select>
              </div>
              <div className="field field-wide">
                <label>备注</label>
                <textarea
                  rows={2}
                  placeholder="选填，如薄弱科目、方便的时间"
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                />
              </div>
              <button className="btn btn-accent submit-btn" type="submit" disabled={submitting}>
                {submitting ? "提交中…" : "立即免费预约"}
              </button>
              {msg && <div className={`form-msg ${msg.type}`}>{msg.text}</div>}
            </form>
          </div>
        </div>
      </section>

      {/* 13. 品牌介绍 */}
      <section className="screen" id="brand">
        <div className="container">
          <div className="screen-img reveal">
            <img src="/img/A_team_of_professional_Chinese_2026-07-27T15-00-33.png" alt="慧速学师资团队" loading="lazy" />
            <span className="cap">AI 教育专家 + 一线老师，共同打磨科学学习方法</span>
          </div>
          <div className="brand-intro reveal">
            <span className="kicker">关于慧速学</span>
            <h2>让每个孩子，都找到适合自己的学习方法</h2>
            <p>
              慧速学 AI 伴学中心，聚焦中学全科托管。我们以 AI 精准分析为底座，
              结合真人伴学落地执行，帮助孩子用更短的时间、更科学的方式实现提分。
              使命是「让学习更高效」，愿景是「成为家长最信赖的 AI 伴学品牌」。
            </p>
          </div>
        </div>
      </section>

      {/* 14. 校区 */}
      <section className="screen" id="campus">
        <div className="container">
          <div className="section-head">
            <span className="kicker">4 大校区 · 就近入学</span>
            <h2>离家近的校区，更方便坚持</h2>
          </div>
          <div className="screen-img reveal">
            <img src="/img/Interior_of_a_modern_tutoring__2026-07-27T15-00-34.png" alt="校区环境" loading="lazy" />
            <span className="cap">明亮舒适的学习中心，给孩子专注的学习环境</span>
          </div>
          <div className="campus-grid">
            {CAMPUSES.map((c) => (
              <div className="campus-card reveal" key={c.name}>
                <h3>{c.name}</h3>
                <p className="addr">{c.addr}</p>
                <a className="tel" href={`tel:${c.tel.replace(/\s/g, "")}`}>老师电话：{c.tel}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. 成交收口 */}
      <section className="screen cta-close" id="close">
        <div className="container">
          <div className="section-head light">
            <span className="kicker">现在就开始</span>
            <h2>免费体检一次，看清提分空间</h2>
            <p className="sub">不报班也能先做检测，看到报告再决定。把选择权交给效果。</p>
          </div>
          <div className="screen-img reveal">
            <img src="/img/A_happy_Chinese_parent__studen_2026-07-27T15-00-35.png" alt="家长学生老师合影" loading="lazy" />
            <span className="cap">现在预约免费体验，让改变从今天开始</span>
          </div>
          <div className="mini-flow reveal">
            <span>免费预约</span><i>→</i><span>到店体检</span><i>→</i><span>出报告</span><i>→</i><span>定制规划</span>
          </div>
          <div className="close-cta reveal">
            <a className="btn btn-accent" href="#signup" onClick={(e) => { e.preventDefault(); setForm((f) => ({ ...f, leadType: "学习力体检" })); smoothTo("signup"); }}>免费预约体验</a>
            <a className="btn btn-ghost-light" href="#campus" onClick={(e) => { e.preventDefault(); smoothTo("campus"); }}>查看校区电话</a>
          </div>
        </div>
      </section>

      {/* 固定底部栏 */}
      <div className="footbar">
        <a className="foot-btn primary" href="#signup" onClick={(e) => { e.preventDefault(); setForm((f) => ({ ...f, leadType: "学习力体检" })); smoothTo("signup"); }}>
          <span className="fb-ico">✦</span>免费测评
        </a>
        <a className="foot-btn ghost" href="#campus" onClick={(e) => { e.preventDefault(); smoothTo("campus"); }}>
          <span className="fb-ico">☎</span>联系老师
        </a>
      </div>
    </>
  );
}
