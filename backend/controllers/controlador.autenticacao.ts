
import { Request, Response } from 'express';
import { logger } from '../logs/logger.js';
import {
  verifyGoogleToken,
  generateJwt,
} from '../services/servico.autenticacao.js';
import { findOrCreateUser } from '../repository/repositorio.usuario.js'; // 1. Importa o repositório

export const googleLoginHandler = async (req: Request, res: Response) => {
  const { credential } = req.body;

  if (!credential) {
    logger.warn('auth.google.missing_credential');
    return res.status(400).json({ message: 'Token de credencial não fornecido.' });
  }

  try {
    // Etapa 1: Verificar o token do Google
    const googleUser: any = await verifyGoogleToken(credential);
    if (!googleUser) {
      logger.warn({ credential }, 'auth.google.invalid_token');
      return res.status(401).json({ message: 'Token do Google inválido.' });
    }
    logger.info({ email: googleUser.email }, 'auth.google.token_verified');

    // Etapa 2: Encontrar ou criar o usuário no banco de dados
    const appUser = await findOrCreateUser({
        sub: googleUser.providerId, 
        name: googleUser.name,
        email: googleUser.email,
        picture: googleUser.picture
    });

    // Etapa 3: Gerar o token JWT para a nossa aplicação
    // Usamos os dados do `appUser` (do nosso DB) para gerar o token.
    const token = generateJwt(appUser);
    logger.info({ email: appUser.email, userId: appUser.id }, 'auth.jwt.generated');

    res.status(200).json({ token });

  } catch (error: any) {
    logger.error(
      { error: { message: error.message, stack: error.stack }, credential },
      'auth.google.login_handler_error'
    );
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
