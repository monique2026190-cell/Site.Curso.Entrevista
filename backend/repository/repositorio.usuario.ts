
import pool from '../db/pool.js';
import { logger } from '../logs/logger.js';
import { findUserByGoogleIdQuery, createUserQuery } from '../db/queries/usuario.queries.js';

interface GoogleUser {
  sub: string;       // Google ID
  name: string;
  email: string;
  picture?: string; // Foto de perfil (opcional)
}

interface AppUser {
  id: number;
  google_id: string;
  nome: string;
  email: string;
  foto_perfil?: string;
}

/**
 * Encontra um usuário pelo ID do Google ou o cria se ele não existir.
 * @param googleUser O perfil do usuário retornado pela verificação do token do Google.
 * @returns O usuário do aplicativo, seja ele encontrado ou recém-criado.
 */
export const findOrCreateUser = async (googleUser: GoogleUser): Promise<AppUser> => {
  const client = await pool.connect();
  try {
    // Verifica se o usuário já existe
    const findUserResult = await client.query(findUserByGoogleIdQuery, [googleUser.sub]);

    if (findUserResult.rows.length > 0) {
      const existingUser = findUserResult.rows[0];
      logger.info({ userId: existingUser.id, email: existingUser.email }, 'User found in database.');
      return existingUser;
    }

    // Se não existir, cria um novo usuário
    logger.info({ email: googleUser.email }, 'User not found. Creating new user.');
    const createUserValues = [
      googleUser.sub,
      googleUser.name,
      googleUser.email,
      googleUser.picture,
    ];
    const createUserResult = await client.query(createUserQuery, createUserValues);

    const newUser = createUserResult.rows[0];
    logger.info({ userId: newUser.id, email: newUser.email }, 'New user created successfully.');

    return newUser;
  } catch (error) {
    logger.error({ error }, 'Error in findOrCreateUser');
    // Lança o erro para ser tratado no controlador
    throw error;
  } finally {
    client.release();
  }
};
