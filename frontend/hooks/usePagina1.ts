import { useEffect } from 'react';
import { dispararPageView, dispararViewContent30s } from '../servicos/servico.meta.ads';

export const usePagina1 = () => {
    useEffect(() => {
        // Dispara o PageView quando o componente que usa o hook é montado
        dispararPageView();

        // Define um timer para disparar o ViewContent após 30 segundos
        const timer30s = setTimeout(() => {
            dispararViewContent30s();
        }, 30000); // 30 segundos

        // Função de limpeza do useEffect: cancela os timers se o componente for desmontado
        return () => {
            clearTimeout(timer30s);
        };
    }, []); // O array vazio garante que o useEffect rode apenas uma vez (na montagem)

    // Este hook não precisa retornar nada, pois seu propósito é apenas disparar eventos.
};
