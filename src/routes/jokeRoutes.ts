import express, { Request, Response } from 'express';
const router = express.Router();
import { getJoke, createJoke, updateJoke, deleteJoke } from '../controllers/jokeController';

// Ruta para obtener un chiste aleatorio o de un tipo específico
router.get('/', (req: Request, res: Response) => getJoke(req, res)); // Ruta para /api/jokes (chiste aleatorio)
router.get('/:type', (req: Request, res: Response) => getJoke(req, res)); // Ruta para /api/jokes/chuck o /api/jokes/dad

// Ruta para crear un chiste
router.post('/', (req: Request, res: Response) => createJoke(req, res));

// Ruta para actualizar un chiste por ID
router.put('/:number', (req: Request<{ number: string }>, res: Response) => updateJoke(req, res));

// Ruta para eliminar un chiste por ID
router.delete('/:number', (req: Request<{ number: string }>, res: Response) => deleteJoke(req, res));

export default router;
