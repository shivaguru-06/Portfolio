// api/_db.ts
import { Client } from "@planetscale/database";

export function db() {
  return new Client({
    host: process.env.DATABASE_HOST!,
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
  });
}

// Helper to run queries with named parameters
export async function query<T = any>(sql: string, params: any[] = []) {
  // Replace ? with :p0, :p1, ...
  let idx = 0;
  const rewritten = sql.replace(/\?/g, () => `:p${idx++}`);
  const named: Record<string, any> = {};
  params.forEach((v, i) => (named[`p${i}`] = v));

  const result = await db().execute(rewritten, named);
  return result.rows as T[];
}
