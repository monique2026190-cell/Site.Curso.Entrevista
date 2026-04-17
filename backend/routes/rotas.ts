
import { Router } from 'express';
import authRoutes from './rotas.autenticacao.js';
import logRoutes from './rotas.log.js';
import courseRoutes from './rotas.cursos.js';
// import commentRoutes from './rotas.comentarios.js';
import stripeRoutes from './rotas.stripe.js';
import profileRoutes from './rotas.perfil.js';

const router = Router();

router.use('/auth', authRoutes);
router.use(logRoutes);
router.use(courseRoutes);
// router.use(commentRoutes);
router.use('/stripe', stripeRoutes);
router.use(profileRoutes);

export default router;
