import { Router } from 'express';
import { controladorComentarios } from '../controllers/controlador.comentarios.js';

const rotasComentarios = Router();

rotasComentarios.get('/:cursoId/comentarios', controladorComentarios.buscarComentariosPorCurso);
rotasComentarios.post('/:cursoId/comentarios', controladorComentarios.criarComentario);

export default rotasComentarios;
