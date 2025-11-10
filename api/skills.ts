// api/skills.ts
import { z } from "zod";
import { query } from "./_db";

const SkillSchema = z.object({
  subject: z.string().min(1),
  level: z.number().int().min(0).max(100),
  logo: z.string().url().optional().or(z.literal("")),
});

export default async function handler(req: Request) {
  const method = (req as any).method || "GET";

  if (method === "GET") {
    const rows = await query("SELECT id, subject, level, logo FROM skills ORDER BY id DESC");
    return Response.json(rows);
  }

  if (method === "POST") {
    const parsed = SkillSchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify(parsed.error.flatten()), { status: 400 });
    }
    const { subject, level, logo } = parsed.data;
    await query("INSERT INTO skills (subject, level, logo) VALUES (?, ?, ?)", [
      subject,
      level,
      logo || null,
    ]);
    const [saved] = await query("SELECT id, subject, level, logo FROM skills ORDER BY id DESC LIMIT 1");
    return Response.json(saved, { status: 201 });
  }

  return new Response("Method Not Allowed", { status: 405 });
}
