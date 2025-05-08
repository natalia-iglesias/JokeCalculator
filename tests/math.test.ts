import request from 'supertest';
import app from '../src/app';

describe('Controlador matemático', () => {
  it('debe calcular el LCM de una lista de números', async () => {
    const res = await request(app).get('/math/lcm?numbers=4,5,10');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(20);
  });

  it('debe devolver error si no se pasa parámetro válido a LCM', async () => {
    const res = await request(app).get('/math/lcm?numbers=');
    expect(res.statusCode).toBe(400);
  });

  it('debe devolver el número incrementado en 1', async () => {
    const res = await request(app).get('/math/plusone?number=41');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(42);
  });

  it('debe devolver error si number no es un número', async () => {
    const res = await request(app).get('/math/plusone?number=abc');
    expect(res.statusCode).toBe(400);
  });
});
