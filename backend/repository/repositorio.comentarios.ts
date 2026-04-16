import pool from '../db/pool.js';
import { queriesComentarios } from '../db/queries/comentarios.queries.js';

export const repositorioComentarios = {
    async buscarComentariosPorCurso(cursoId: number) {
        const res = await pool.query(queriesComentarios.buscarComentariosPorCurso, [cursoId]);
        return res.rows;
    },

    async criarComentario(cursoId: number, usuarioId: number, comentario: string) {
        const res = await pool.query(queriesComentarios.criarComentario, [cursoId, usuarioId, comentario]);
        return res.rows[0];
    },
};
