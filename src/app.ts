import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import jokeRoutes from './routes/jokeRoutes';
import mathRoutes from './routes/mathRoutes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/jokes', jokeRoutes);
app.use('/api/math', mathRoutes);
app.use('/math', mathRoutes);

// Ruta base
app.get('/', (req: Request, res: Response): void => {
  res.send('API de chistes y matemáticas funcionando.');
});

export default app;
