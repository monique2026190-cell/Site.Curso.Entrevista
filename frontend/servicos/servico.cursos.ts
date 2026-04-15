import api from './api';

/**
 * Busca a lista de todos os cursos disponíveis.
 * @returns A resposta da API com a lista de cursos.
 */
export const buscarCursos = () => {
  return api.get('/api/cursos');
};
