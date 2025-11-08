import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import skillsRouter from './routes/skills';
import expRouter from './routes/experience';
import projectsRouter from './routes/projects';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;


app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));


app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/skills', skillsRouter);
app.use('/api/experience', expRouter);
app.use('/api/projects', projectsRouter);


app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));