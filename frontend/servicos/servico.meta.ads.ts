import axios from 'axios';

// Rota base para o nosso backend que se comunica com a API do Meta
const API_URL = '/api/meta';

// --- Funções de Utilidade para Rastreamento ---

const obterFbp = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/_fbp=([^;]+)/);
  return match ? match[1] : undefined;
};

const obterFbc = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/_fbc=([^;]+)/);
  return match ? match[1] : undefined;
};

// --- Definições de Tipos de Dados (Interfaces) ---

/**
 * Dados do usuário para Advanced Matching.
 * As chaves seguem o padrão da API do Meta (ex: 'em' para 'email').
 */
export interface UserData {
  em?: string;      // Email
  ph?: string;      // Telefone
  fn?: string;      // Nome
  ln?: string;      // Sobrenome
  ct?: string;      // Cidade
  st?: string;      // Estado (sigla de 2 letras, ex: 'SP')
  country?: string; // País (código ISO 3166-1 alpha-2, ex: 'BR')
  zp?: string;      // CEP
  ge?: string;      // Gênero ('f' ou 'm')
  db?: string;      // Data de nascimento (formato YYYYMMDD)
  external_id?: string; // ID Externo do usuário no seu sistema
  subscription_id?: string; // ID de Assinatura (para Facebook Login ID)
}

/**
 * Dados customizados do evento, relacionados ao conteúdo e valor.
 */
export interface CustomData {
  content_type?: string;
  content_name?: string;
  num_items?: number;
  predicted_ltv?: number;
  search_string?: string;
  value?: number;
  currency?: string;     // Moeda (código ISO 4217, ex: 'BRL')
  content_ids?: string[];// IDs dos conteúdos/produtos
}

/**
 * Estrutura do payload de evento enviado para o backend.
 */
interface RequisicaoEvento {
  eventName: string;
  userData?: UserData;
  customData?: CustomData;
  eventSourceUrl: string;
  eventId?: string;
}

// --- Função Principal de Envio de Evento ---

/**
 * Função genérica para enviar um evento para o backend.
 */
const enviarEventoParaServidor = async (payload: RequisicaoEvento) => {
  const payloadCompleto = {
    ...payload,
    fbp: obterFbp(),
    fbc: obterFbc(),
  };

  try {
    await axios.post(`${API_URL}/event`, payloadCompleto);
    console.log(`Evento '${payload.eventName}' disparado com sucesso para o backend.`);
  } catch (error) {
    console.error(`Erro ao disparar o evento '${payload.eventName}':`, error);
  }
};

// --- Funções Exportadas para Disparar Eventos Específicos ---

/**
 * Dispara o evento PageView (Visualização de Página).
 */
export const dispararVisualizacaoPagina = (dadosUsuario?: UserData) => {
  enviarEventoParaServidor({
    eventName: 'PageView',
    eventSourceUrl: window.location.href,
    eventId: `pageview_${Date.now()}`,
    userData: dadosUsuario,
  });
};

/**
 * Dispara o evento Lead (quando um usuário demonstra interesse).
 */
export const dispararLead = (dadosUsuario: UserData, eventId?: string) => {
  enviarEventoParaServidor({
    eventName: 'Lead',
    userData: dadosUsuario,
    eventSourceUrl: window.location.href,
    eventId: eventId || `lead_${Date.now()}`,
  });
};

/**
 * Dispara o evento InitiateCheckout (Início de Checkout).
 */
export const dispararInicioCheckout = (dadosCustomizados: CustomData, dadosUsuario?: UserData, eventId?: string) => {
  enviarEventoParaServidor({
    eventName: 'InitiateCheckout',
    customData: dadosCustomizados,
    userData: dadosUsuario,
    eventSourceUrl: window.location.href,
    eventId: eventId || `initiate_checkout_${Date.now()}`,
  });
};

/**
 * Dispara o evento ViewContent (Visualização de Conteúdo).
 */
export const dispararVisualizacaoConteudo = (dadosCustomizados: CustomData, dadosUsuario?: UserData, eventId?: string) => {
  enviarEventoParaServidor({
    eventName: 'ViewContent',
    customData: dadosCustomizados,
    userData: dadosUsuario,
    eventSourceUrl: window.location.href,
    eventId: eventId || `view_content_${Date.now()}`,
  });
};

/**
 * Dispara um evento customizado de visualização por 30 segundos.
 */
export const dispararVisualizacaoConteudo30s = (dadosUsuario?: UserData) => {
  enviarEventoParaServidor({
    eventName: 'CustomViewContent30s',
    eventSourceUrl: window.location.href,
    eventId: `custom_view_30s_${Date.now()}`,
    userData: dadosUsuario,
  });
};
