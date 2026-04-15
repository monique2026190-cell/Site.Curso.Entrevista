
// backend/db/queries/curso.queries.ts

export const findAllCursosQuery = 'SELECT * FROM cursos ORDER BY criado_em DESC';

export const insertCursoQuery = `
  INSERT INTO cursos (titulo, descricao, preco)
  VALUES ($1, $2, $3)
  RETURNING *;
`;
