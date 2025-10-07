import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './api/users/user.routes.js';
import areaRoutes from './api/areas/area.routes.js';

const app: Express = express();

app.use(cors());

app.use(express.json());

app.get('/api/v1', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API do Hub Pessoal está funcionando!' });
});

app.use('/api/v1/users', userRoutes);

app.use('/api/v1/areas', areaRoutes);

export default app;