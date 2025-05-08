import { Router } from 'express';
import { lcm, plusOne } from '../controllers/mathController';

const router = Router();


router.get('/lcm', lcm);
router.get('/plusone', plusOne); 

export default router;
