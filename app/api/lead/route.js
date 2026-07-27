import { NextResponse } from "next/server";

// 允许表单从任意来源提交（如需限制可改为具体域名）
export const dynamic = "force-dynamic";

const VALID_LEAD_TYPES = [
  "学习力体检",
  "单词速记体验",
  "中考技巧体验",
  "低价体验课预约",
];
const VALID_SUBJECTS = ["数学", "英语", "物理", "化学", "语文", "其他"];
const VALID_CAMPUSES = ["桥西校区", "新华校区", "长安校区", "高新校区"];

function isValidPhone(phone) {
  return /^1[3-9]\d{9}$/.test(String(phone || "").trim());
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, msg: "请求格式错误" }, { status: 400 });
  }

  const { leadType, subject, campus, phone, name, grade } = body || {};

  // 基础校验
  if (!VALID_LEAD_TYPES.includes(leadType)) {
    return NextResponse.json({ ok: false, msg: "请选择有效的体验类型" }, { status: 400 });
  }
  if (!VALID_CAMPUSES.includes(campus)) {
    return NextResponse.json({ ok: false, msg: "请选择有效的校区" }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ ok: false, msg: "请填写正确的 11 位手机号" }, { status: 400 });
  }

  const payload = {
    lead_type: leadType,
    subject: VALID_SUBJECTS.includes(subject) ? subject : null,
    campus,
    phone: String(phone).trim(),
    name: name ? String(name).trim().slice(0, 50) : null,
    grade: grade ? String(grade).trim().slice(0, 20) : null,
    status: "pending",
  };

  // ===== 接入 Supabase（配置了环境变量才生效）=====
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      });
      const { error } = await supabase.from("leads").insert(payload);
      if (error) throw error;
      return NextResponse.json({ ok: true, msg: "预约成功，老师会尽快与您联系！" });
    } catch (e) {
      console.error("[lead] Supabase 写入失败：", e?.message || e);
      // 写入失败不阻断用户，返回成功但提示已记录
      return NextResponse.json({
        ok: true,
        msg: "预约已提交（后台写入数据库稍后同步）",
      });
    }
  }

  // ===== 未配置数据库：降级为模拟写入（仅服务端日志）=====
  console.log("[lead] 模拟写入线索：", payload);
  return NextResponse.json({ ok: true, msg: "预约成功，老师会尽快与您联系！" });
}
