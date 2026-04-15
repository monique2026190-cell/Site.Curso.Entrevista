import { logger } from '../logs/logger.js';
import { verifyGoogleToken, generateJwt, } from '../services/servico.autenticacao.js';
import { findOrCreateUser } from '../repository/repositorio.usuario.js';
export const googleLoginHandler = async (req, res) => {
    const { credential } = req.body;
    if (!credential) {
        logger.warn('auth.google.missing_credential');
        return res.status(400).json({ message: 'Token de credencial não fornecido.' });
    }
    try {
        const googleUser = await verifyGoogleToken(credential);
        if (!googleUser) {
            logger.warn({ credential }, 'auth.google.invalid_token');
            return res.status(401).json({ message: 'Token do Google inválido.' });
        }
        logger.info({ email: googleUser.email }, 'auth.google.token_verified');
        const appUser = await findOrCreateUser({
            sub: googleUser.providerId,
            name: googleUser.name,
            email: googleUser.email,
            picture: googleUser.picture
        });
        const token = generateJwt(appUser);
        logger.info({ email: appUser.email, userId: appUser.id }, 'auth.jwt.generated');
        const userForFrontend = {
            id: appUser.id,
            email: appUser.email,
            name: appUser.nome,
            picture: appUser.foto_perfil
        };
        res.status(200).json({
            token,
            perfilCompleto: appUser.perfil_completo,
            user: userForFrontend,
        });
    }
    catch (error) {
        logger.error({ error: { message: error.message, stack: error.stack }, credential }, 'auth.google.login_handler_error');
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};
