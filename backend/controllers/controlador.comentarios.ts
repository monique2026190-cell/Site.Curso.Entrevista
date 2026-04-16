import { Request, Response } from 'express';
import { servicoComentarios } from '../services/servico.comentarios.js';

export const controladorComentarios = {
    async buscarComentariosPorCurso(req: Request, res: Response) {
        try {
            const cursoId = parseInt(req.params.cursoId);
            const comentarios = await servicoComentarios.buscarComentariosPorCurso(cursoId);
            res.json(comentarios);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async criarComentario(req: Request, res: Response) {
        try {
            const cursoId = parseInt(req.params.cursoId);
            const { usuarioId, comentario } = req.body;
            const novoComentario = await servicoComentarios.criarComentario(cursoId, usuarioId, comentario);
            res.status(201).json(novoComentario);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },
};
