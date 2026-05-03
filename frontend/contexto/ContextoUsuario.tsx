import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserData } from '../servicos/servico.meta.ads'; // Importa a interface que já definimos

// Define o formato do valor do nosso contexto
interface TipoContextoUsuario {
  dadosUsuario: UserData;
  definirDadosUsuario: (dadosUsuario: UserData) => void;
}

// Cria o Contexto com um valor padrão inicial
const ContextoUsuario = createContext<TipoContextoUsuario | undefined>(undefined);

// Cria o Provedor (Provider) do Contexto
// Ele é um componente que vai "envolver" a nossa aplicação
export const ProvedorUsuario = ({ children }: { children: ReactNode }) => {
  const [dadosUsuario, setDadosUsuario] = useState<UserData>({});

  const lidarComDefinicaoDadosUsuario = (novosDadosUsuario: UserData) => {
    // Mantém os dados antigos e adiciona/sobrescreve os novos
    setDadosUsuario(dadosAnteriores => ({ ...dadosAnteriores, ...novosDadosUsuario }));
  };

  return (
    <ContextoUsuario.Provider value={{ userData: dadosUsuario, setUserData: lidarComDefinicaoDadosUsuario }}>
      {children}
    </ContextoUsuario.Provider>
  );
};

// Cria um hook customizado para facilitar o uso do contexto
// Em vez de importar `useContext` e `UserContext` em todo arquivo,
// vamos simplesmente usar `useUsuario()`
export const useUsuario = () => {
  const contexto = useContext(ContextoUsuario);
  if (contexto === undefined) {
    throw new Error('useUsuario deve ser usado dentro de um ProvedorUsuario');
  }
  return contexto;
};
