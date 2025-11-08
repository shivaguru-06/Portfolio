import { Router } from 'express';
import { pool } from '../db';
import { z } from 'zod';


const router = Router();
const ExpSchema = z.object({ company: z.string(), role: z.string(), period: z.string().optional(), points: z.array(z.string()).optional() });


router.get('/', async (_, res) => {
const [rows] = await pool.query('SELECT * FROM experience ORDER BY id DESC');
res.json(rows);
});


router.post('/', async (req, res) => {
const parse = ExpSchema.safeParse(req.body);
if (!parse.success) return res.status(400).json(parse.error);
const { company, role, period, points } = parse.data;
await pool.query('INSERT INTO experience (company, role, period, points) VALUES (?, ?, ? ,?)', [company, role, period, JSON.stringify(points)]);
res.json({ message: 'Experience added successfully' });
});


export default router;