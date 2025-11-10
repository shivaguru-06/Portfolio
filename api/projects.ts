// api/projects.ts
import { z } from "zod";
import { query } from "./_db";

const ProjectSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
  description: z.string().optional().or(z.literal("")),
  skills: z.string().optional().or(z.literal("")),
});

export default async function handler(req: Request) {
  const method = (req as any).method || "GET";

  if (method === "GET") {
    const rows = await query("SELECT id, name, url, description, skills FROM projects ORDER BY id DESC");
    return Response.json(rows);
  }

  if (method === "POST") {
    const parsed = ProjectSchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify(parsed.error.flatten()), { status: 400 });
    }
    const { name, url, description, skills } = parsed.data;
    await query("INSERT INTO projects (name, url, description, skills) VALUES (?, ?, ?, ?)", [
      name, url, description || null, skills || null
    ]);
    const [saved] = await query("SELECT id, name, url, description, skills FROM projects ORDER BY id DESC LIMIT 1");
    return Response.json(saved, { status: 201 });
  }

  return new Response("Method Not Allowed", { status: 405 });
}
