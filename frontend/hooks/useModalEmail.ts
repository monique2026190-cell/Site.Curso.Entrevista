import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dispararLead } from '../servicos/servico.meta.ads';

// O hook recebe as dependências externas de que precisa para funcionar.
export const useModalEmail = (onClose: () => void) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (email.trim()) {
      // A lógica de negócio principal está aqui.
      dispararLead({ em: email });
    }
    // As ações que acontecem após a submissão.
    onClose();
    navigate('/pagina-vendas');
  };

  // O hook retorna o estado e as funções que o componente precisará.
  return {
    email,
    setEmail,
    handleSubmit,
  };
};
