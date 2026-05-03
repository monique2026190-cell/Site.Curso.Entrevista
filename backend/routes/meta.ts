import express from 'express';
import { handleEvent } from '../controllers/metaController';

const router = express.Router();

// Rota única para receber todos os tipos de eventos do frontend
router.post('/event', handleEvent);

export default router;
