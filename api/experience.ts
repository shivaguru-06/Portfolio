// api/experience.ts
import { z } from "zod";
import { query } from "./_db";

const ExpSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  points: z.array(z.string().min(1)).default([]),
});

export default async function handler(req: Request) {
  const method = (req as any).method || "GET";

  if (method === "GET") {
    const exps = await query<any>("SELECT id, company, role, period FROM experience ORDER BY id DESC");
    const pts  = await query<any>("SELECT experience_id, point FROM experience_points");
    const combined = exps.map((e: any) => ({
      ...e,
      points: pts.filter((p: any) => p.experience_id === e.id).map((p: any) => p.point),
    }));
    return Response.json(combined);
  }

  if (method === "POST") {
    const parsed = ExpSchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify(parsed.error.flatten()), { status: 400 });
    }
    const { company, role, period, points } = parsed.data;

    await query("INSERT INTO experience (company, role, period) VALUES (?, ?, ?)", [
      company, role, period
    ]);
    const [{ id: expId }] = await query<any>("SELECT id FROM experience ORDER BY id DESC LIMIT 1");

    for (const p of points || []) {
      await query("INSERT INTO experience_points (experience_id, point) VALUES (?, ?)", [expId, p]);
    }

    return Response.json({ id: expId, company, role, period, points: points || [] }, { status: 201 });
  }

  return new Response("Method Not Allowed", { status: 405 });
}
