
// backend/db/queries/usuario.queries.ts

export const findUserByGoogleIdQuery = 'SELECT * FROM usuarios WHERE google_id = $1';

export const createUserQuery = `
  INSERT INTO usuarios (google_id, nome, email, foto_perfil)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
`;
