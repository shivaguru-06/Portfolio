import { Router } from 'express';
import { pool } from '../db';
import { z } from 'zod';


const router = Router();
const ProjectSchema = z.object({ name: z.string(), url: z.string().optional(), description: z.string().optional(), skills: z.string().optional() });


router.get('/', async (_, res) => {
const [rows] = await pool.query('SELECT * FROM projects ORDER BY id DESC');
res.json(rows);
});


router.post('/', async (req, res) => {
const parse = ProjectSchema.safeParse(req.body);
if (!parse.success) return res.status(400).json(parse.error);
const { name, url, description, skills } = parse.data;
await pool.query('INSERT INTO projects (name, url, description, skills) VALUES (?, ?, ?, ?)', [name, url, description, skills]);
res.json({ message: 'Project added successfully' });
});


export default router;