import { useCallback } from 'react';
import { useUsuario } from '../contexto/ContextoUsuario';
import {
  dispararVisualizacaoPagina as srvDispararVisualizacaoPagina,
  dispararLead as srvDispararLead,
  dispararInicioCheckout as srvDispararInicioCheckout,
  dispararVisualizacaoConteudo as srvDispararVisualizacaoConteudo,
  dispararVisualizacaoConteudo30s as srvDispararVisualizacaoConteudo30s,
  CustomData,
  UserData,
} from '../servicos/servico.meta.ads';

/**
 * Hook customizado para abstrair e simplificar o rastreamento de eventos da API do Meta.
 * Ele automaticamente injeta os dados do usuário (obtidos do ContextoUsuario) em cada evento.
 */
export const useAnalise = () => {
  const { dadosUsuario } = useUsuario();

  /**
   * Junta os dados do usuário do contexto com quaisquer dados adicionais passados no momento da chamada.
   * @param dadosAdicionais - Dados extras do usuário para um evento específico.
   * @returns Um objeto UserData combinado.
   */
  const obterDadosFinaisUsuario = useCallback((dadosAdicionais?: UserData): UserData => {
    return { ...dadosUsuario, ...dadosAdicionais };
  }, [dadosUsuario]);

  /**
   * Rastreia o evento PageView.
   * Não precisa de argumentos, pois os dados do usuário já são injetados.
   */
  const rastrearVisualizacaoPagina = useCallback(() => {
    srvDispararVisualizacaoPagina(obterDadosFinaisUsuario());
  }, [obterDadosFinaisUsuario]);

  /**
   * Rastreia o evento Lead.
   * @param dadosLead - Dados específicos do lead (ex: email, se não estiver no contexto ainda).
   * @param eventId - ID opcional para desduplicação.
   */
  const rastrearLead = useCallback((dadosLead?: UserData, eventId?: string) => {
    const dadosFinais = obterDadosFinaisUsuario(dadosLead);
    // O evento Lead exige dados do usuário, então garantimos que há algo para enviar.
    if (Object.keys(dadosFinais).length > 0) {
      srvDispararLead(dadosFinais, eventId);
    }
  }, [obterDadosFinaisUsuario]);

  /**
   * Rastreia o evento InitiateCheckout.
   * @param dadosCustomizados - Informações sobre o checkout (valor, itens).
   * @param eventId - ID opcional para desduplicação.
   */
  const rastrearInicioCheckout = useCallback((dadosCustomizados: CustomData, eventId?: string) => {
    srvDispararInicioCheckout(dadosCustomizados, obterDadosFinaisUsuario(), eventId);
  }, [obterDadosFinaisUsuario]);

  /**
   * Rastreia o evento ViewContent.
   * @param dadosCustomizados - Informações sobre o conteúdo (nome, tipo).
   * @param eventId - ID opcional para desduplicação.
   */
  const rastrearVisualizacaoConteudo = useCallback((dadosCustomizados: CustomData, eventId?: string) => {
    srvDispararVisualizacaoConteudo(dadosCustomizados, obterDadosFinaisUsuario(), eventId);
  }, [obterDadosFinaisUsuario]);

  /**
   * Rastreia o evento customizado de visualização por 30 segundos.
   */
  const rastrearVisualizacaoConteudo30s = useCallback(() => {
    srvDispararVisualizacaoConteudo30s(obterDadosFinaisUsuario());
  }, [obterDadosFinaisUsuario]);

  // Retorna as funções de rastreamento para serem usadas nos componentes.
  return {
    rastrearVisualizacaoPagina,
    rastrearLead,
    rastrearInicioCheckout,
    rastrearVisualizacaoConteudo,
    rastrearVisualizacaoConteudo30s,
  };
};
