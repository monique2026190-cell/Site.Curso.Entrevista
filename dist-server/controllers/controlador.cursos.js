import { buscarTodosCursos } from '../repository/repositorio.cursos';
import { logger } from '../logs/logger';
/**
 * Lida com a requisição para buscar todos os cursos.
 */
export const getCursos = async (req, res) => {
    try {
        const cursos = await buscarTodosCursos();
        res.json(cursos);
    }
    catch (error) {
        logger.error({ error }, 'Erro ao buscar cursos');
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
};
