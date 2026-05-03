import { useState } from 'react';
import { dispararInitiateCheckout } from '../servicos/servico.meta.ads';
import { LINK_KIWIFY } from '../app.links';

export const usePaginaVendas = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleBuyButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispararInitiateCheckout();
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
