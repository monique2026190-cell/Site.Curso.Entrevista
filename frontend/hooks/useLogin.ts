
import { useAuth } from '../contexto/contexto.autenticacao';
import { logger } from '../utils/logger';

export const useLogin = () => {
  const { login } = useAuth();

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      logger.info('FRONTEND', 'AUTH', 'Google login success, calling login function.');
      login(credentialResponse.credential);
    }
  };

  const handleGoogleError = () => {
    logger.error('FRONTEND', 'AUTH', 'Login com Google falhou.');
  };

  const handleEmailPasswordLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Em ambiente de desenvolvimento, simula o login com um token falso.
    if (import.meta.env.DEV) {
      logger.info('FRONTEND', 'AUTH', 'Dev login with dummy token.');
      login('dummy-token');
    }
  };

  return {
    handleGoogleSuccess,
    handleGoogleError,
    handleEmailPasswordLogin,
  };
};
