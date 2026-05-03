import { useEffect } from 'react';
import { dispararPageView, dispararViewContent30s, dispararViewContent60s } from '../servicos/servico.meta.ads';

export const usePagina1 = () => {
  useEffect(() => {
    // Dispara o PageView quando o componente que usa o hook é montado
    dispararPageView();

    // Dispara o evento de 30s
    const timer30s = setTimeout(() => {
      dispararViewContent30s();
    }, 30000);

    // Dispara o evento de 60s
    const timer60s = setTimeout(() => {
      dispararViewContent60s();
    }, 60000);

    // Limpa os timers quando o componente é desmontado
    return () => {
      clearTimeout(timer30s);
      clearTimeout(timer60s);
    };
  }, []); // O array de dependências vazio garante que isso rode apenas uma vez
};
