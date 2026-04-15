import { Router } from 'express';
import authRoutes from './rotas.autenticacao';
import logRoutes from './rotas.log';
import courseRoutes from './rotas.cursos';

const router = Router();

router.use('/auth', authRoutes);
router.use(logRoutes);
router.use(courseRoutes);

export default router;
