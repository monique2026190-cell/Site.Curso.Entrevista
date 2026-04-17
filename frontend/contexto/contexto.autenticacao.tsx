
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logger } from '../logs/app.log';
import { loginComGoogle } from '../servicos/servico.autenticacao';
import api from '../servicos/api';

type User = {
  id: any;
  email: string;
  nome?: string;
  foto_perfil?: string;
};

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (credential: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const restaurarSessao = async () => {
      console.log("Restaurando sessão...");
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      console.log("Token do localStorage:", storedToken);
      console.log("Usuário do localStorage:", storedUser);

      if (storedToken && storedUser) {
        logger.info('auth.session.restore.attempt', { hasToken: true, hasUser: true });
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        console.log("Sessão restaurada:", { token: storedToken, user: JSON.parse(storedUser) });
      } else {
        logger.info('auth.session.restore.no_data', { hasToken: !!storedToken, hasUser: !!storedUser });
        console.log("Nenhum dado de sessão encontrado.");
      }
      setLoading(false);
      console.log("Restauração da sessão concluída. Loading:", false);
    };

    restaurarSessao();
  }, []);

  const login = async (credential: string) => {
    setLoading(true);
    logger.info('auth.login.attempt');

    if (import.meta.env.DEV && credential === 'dummy-token') {
      const dummyUser = { id: 'dummy-id', email: 'dev@example.com', nome: 'Dev User' };
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('user', JSON.stringify(dummyUser));
      api.defaults.headers.common['Authorization'] = 'Bearer dummy-token';
      setToken('dummy-token');
      setUser(dummyUser);
      setLoading(false);
      navigate('/cursos');
      return;
    }

    try {
      const response = await loginComGoogle(credential);
      const { token: newToken, perfilCompleto, user: loggedInUser } = response.data;

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

      setToken(newToken);
      setUser(loggedInUser);

      logger.info('auth.login.success', { userId: loggedInUser?.id, email: loggedInUser?.email, perfilCompleto });

      if (perfilCompleto) {
        navigate('/cursos');
      } else {
        navigate('/completar-perfil');
      }

    } catch (error: any) {
      logger.error('auth.login.error', { message: error.message, stack: error.stack });
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logger.info('auth.logout.success', { userId: user?.id, email: user?.email });
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const value = {
    token,
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
