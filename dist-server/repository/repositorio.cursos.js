import pool from '../db/pool.js';
import { logger } from '../logs/logger.js';
import { findAllCursosQuery, insertCursoQuery } from '../db/queries/curso.queries.js';
/**
 * Retorna todos os cursos do banco de dados.
 * @returns Uma lista de todos os cursos.
 */
export const getAllCursos = async () => {
    const client = await pool.connect();
    try {
        const result = await client.query(findAllCursosQuery);
        return result.rows;
    }
    catch (error) {
        logger.error({ error }, 'Error in getAllCursos');
        throw error;
    }
    finally {
        client.release();
    }
};
/**
 * Cria um novo curso no banco de dados.
 * @param cursoData Os dados do novo curso a ser criado.
 * @returns O curso recém-criado.
 */
export const createCurso = async (cursoData) => {
    const { titulo, descricao, preco } = cursoData;
    const client = await pool.connect();
    try {
        const values = [titulo, descricao, preco];
        const result = await client.query(insertCursoQuery, values);
        const newCurso = result.rows[0];
        logger.info({ cursoId: newCurso.id, titulo: newCurso.titulo }, 'New curso created successfully.');
        return newCurso;
    }
    catch (error) {
        logger.error({ error, cursoData }, 'Error in createCurso');
        throw error;
    }
    finally {
        client.release();
    }
};
