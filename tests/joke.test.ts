import request from 'supertest';
import app from '../src/app';
import { Joke } from '../src/models/joke';
import jokeService from '../src/services/jokeService';

jest.mock('../src/models/joke');
jest.mock('../src/services/jokeService');

describe('Controlador de chistes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe obtener un chiste aleatorio y guardarlo', async () => {
    (jokeService.fetchJoke as jest.Mock).mockResolvedValue('Un chiste divertido');
    (Joke.create as jest.Mock).mockResolvedValue({ id: 1, text: 'Un chiste divertido' });

    const res = await request(app).get('/api/jokes');

    expect(res.statusCode).toBe(200);
    expect(res.body.joke.text).toBe('Un chiste divertido');
    expect(jokeService.fetchJoke).toHaveBeenCalled();
    expect(Joke.create).toHaveBeenCalledWith({ text: 'Un chiste divertido' });
  });

  it('debe crear un chiste nuevo', async () => {
    const nuevoChiste = { id: 2, text: 'Otro chiste' };
    (Joke.create as jest.Mock).mockResolvedValue(nuevoChiste);

    const res = await request(app).post('/api/jokes').send({ text: 'Otro chiste' });

    expect(res.statusCode).toBe(201);
    expect(res.body.joke).toEqual(nuevoChiste);
  });

  it('debe actualizar un chiste existente', async () => {
    const fakeChiste = { id: 1, text: 'Viejo chiste', save: jest.fn().mockResolvedValue(undefined) };
    (Joke.findByPk as jest.Mock).mockResolvedValue(fakeChiste);

    const res = await request(app).put('/api/jokes/1').send({ text: 'Nuevo chiste' });

    expect(res.statusCode).toBe(200);
    expect(fakeChiste.text).toBe('Nuevo chiste');
    expect(fakeChiste.save).toHaveBeenCalled();
  });

  it('debe eliminar un chiste existente', async () => {
    const fakeChiste = { destroy: jest.fn().mockResolvedValue(undefined) };
    (Joke.findByPk as jest.Mock).mockResolvedValue(fakeChiste);

    const res = await request(app).delete('/api/jokes/1');

    expect(res.statusCode).toBe(200);
    expect(fakeChiste.destroy).toHaveBeenCalled();
  });
});
