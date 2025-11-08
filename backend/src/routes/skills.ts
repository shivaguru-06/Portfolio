import { Router } from 'express';
import { pool } from '../db';
import { z } from 'zod';


const router = Router();
const SkillSchema = z.object({ subject: z.string(), level: z.number(), logo: z.string().optional() });


router.get('/', async (_, res) => {
const [rows] = await pool.query('SELECT * FROM skills ORDER BY id DESC');
res.json(rows);
});


router.post('/', async (req, res) => {
const parse = SkillSchema.safeParse(req.body);
if (!parse.success) return res.status(400).json(parse.error);
const { subject, level, logo } = parse.data;
await pool.query('INSERT INTO skills (subject, level, logo) VALUES (?, ?, ?)', [subject, level, logo]);
res.json({ message: 'Skill added successfully' });
});


export default router;