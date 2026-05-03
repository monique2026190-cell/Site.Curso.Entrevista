import { useEffect } from 'react';
import { useAnalise } from './useAnalise'; // Importa o novo hook centralizado

/**
 * Hook para a lógica de rastreamento específica da Página 1.
 */
export const usePagina1 = () => {
    // Obtém as funções de rastreamento do nosso hook de análise
    const { rastrearVisualizacaoPagina, rastrearVisualizacaoConteudo30s } = useAnalise();

    useEffect(() => {
        // Dispara o evento de PageView. 
        // Não é mais necessário passar dados do usuário aqui, o useAnalise faz isso.
        rastrearVisualizacaoPagina();

        // Define um timer para o evento de 30 segundos
        const timer30s = setTimeout(() => {
            rastrearVisualizacaoConteudo30s();
        }, 30000); // 30 segundos

        // Função de limpeza para cancelar o timer
        return () => {
            clearTimeout(timer30s);
        };
        
    // A dependência agora é das funções de rastreamento, que são estáveis pelo useCallback no useAnalise
    }, [rastrearVisualizacaoPagina, rastrearVisualizacaoConteudo30s]);
};
