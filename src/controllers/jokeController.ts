import { Request, Response } from 'express';
import jokeService from '../services/jokeService';
import { Joke } from '../models/joke';

async function getJoke(req: Request, res: Response): Promise<void> {
  let { type } = req.params;

  if (type) {
    type = type.trim().toLowerCase();
  }

  try {
    const jokeText = await jokeService.fetchJoke(type);
    const savedJoke = await Joke.create({ text: jokeText });
    res.json({ message: 'Chiste obtenido y guardado', joke: savedJoke });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

async function createJoke(req: Request, res: Response): Promise<void> {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ error: 'El chiste es requerido' });
    return;
  }

  try {
    const newJoke = await Joke.create({ text });
    res.status(201).json({ message: 'Chiste guardado', joke: newJoke });
  } catch (err: any) {
    res.status(500).json({ error: 'Error al guardar el chiste' });
  }
}

async function updateJoke(
  req: Request<{ number: string }>,
  res: Response
): Promise<void> {
  const { number } = req.params;
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ error: 'Nuevo texto requerido' });
    return;
  }

  const jokeId = parseInt(number, 10);

  try {
    const joke = await Joke.findByPk(jokeId);
    if (!joke) {
      res.status(404).json({ error: 'Chiste no encontrado' });
      return;
    }

    joke.text = text;
    await joke.save();

    res.json({ message: 'Chiste actualizado', joke });
  } catch (err: any) {
    res.status(500).json({ error: 'Error al actualizar el chiste' });
  }
}

async function deleteJoke(
  req: Request<{ number: string }>,
  res: Response
): Promise<void> {
  const { number } = req.params;
  const jokeId = parseInt(number, 10);

  try {
    const joke = await Joke.findByPk(jokeId);
    if (!joke) {
      res.status(404).json({ error: 'Chiste no encontrado' });
      return;
    }

    await joke.destroy();
    res.json({ message: 'Chiste eliminado' });
  } catch (err: any) {
    res.status(500).json({ error: 'Error al eliminar el chiste' });
  }
}

export { getJoke, createJoke, updateJoke, deleteJoke };
