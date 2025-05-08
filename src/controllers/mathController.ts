import { Request, Response } from 'express';

// Helpers
function getLCM(numbers: number[]): number {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);
  return numbers.reduce((acc, val) => lcm(acc, val), 1);
}

// Controlador de LCM
export const lcm = (req: Request, res: Response): Response => {
  const { numbers } = req.query as { numbers?: string };

  // Validar que los números estén presentes
  if (!numbers || typeof numbers !== 'string') {
    return res.status(400).json({ error: 'Se requiere el parámetro "numbers" como una cadena de texto' });
  }

  // Convertir la cadena de texto a un array de números
  const numArray = numbers
    .split(',')
    .map(n => parseInt(n, 10))
    .filter(n => !isNaN(n)); // Filtramos los valores que no son números

  // Validar si la lista de números es válida
  if (numArray.length === 0) {
    return res.status(400).json({ error: 'Proporcione números válidos' });
  }

  // Calcular el LCM
  const result = getLCM(numArray);
  return res.json({ result });
};

// Controlador de PlusOne
export const plusOne = (req: Request, res: Response): Response => {
  const { number } = req.query as { number?: string };

  // Convertir el valor de la consulta en un número
  const num = typeof number === 'string' ? parseInt(number, 10) : NaN;

  // Validar si el número es válido
  if (isNaN(num)) {
    return res.status(400).json({ error: 'Proporcione un número válido' });
  }

  // Responder con el número incrementado en 1
  return res.json({ result: num + 1 });
};
