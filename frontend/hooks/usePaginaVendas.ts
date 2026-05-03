import { useState } from 'react';
import { useAnalise } from './useAnalise'; // 1. Importar o hook de análise centralizado
import { LINK_KIWIFY } from '../app.links';

export const usePaginaVendas = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const { rastrearInicioCheckout } = useAnalise(); // 2. Obter a função de rastreamento correta

  const handleBuyButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // 3. Chamar a função de rastreamento do `useAnalise`
    // Os dados do usuário serão injetados automaticamente pelo hook.
    rastrearInicioCheckout({
        // Adicione aqui os dados customizados do evento, como valor e moeda
        value: 197.00,
        currency: 'BRL',
    });

    setTimeout(() => {
      window.location.href = LINK_KIWIFY;
    }, 500); // Atraso para garantir o envio do pixel
  };

  return {
    isButtonHovered,
    setIsButtonHovered,
    handleBuyButtonClick,
  };
};
