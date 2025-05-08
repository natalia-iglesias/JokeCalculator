import { Router } from 'express';
import { lcm, plusOne } from '../controllers/mathController';

const router = Router();

// Asegúrate de que los controladores son funciones que aceptan (req: Request, res: Response)
router.get('/lcm', lcm);  // No es necesario envolver en una función anónima
router.get('/plusone', plusOne);  // No es necesario envolver en una función anónima

export default router;
