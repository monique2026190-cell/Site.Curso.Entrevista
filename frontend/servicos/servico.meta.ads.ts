import axios from 'axios';

const API_URL = '/api/meta'; // Rota base para o backend

// -- Funções de Utilidade para Rastreamento --

/**
 * Extrai o cookie _fbp (Facebook Browser ID).
 * @returns O valor do cookie _fbp ou undefined se não for encontrado.
 */
const getFbp = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/_fbp=([^;]+)/);
  return match ? match[1] : undefined;
};

/**
 * Extrai o cookie _fbc (Facebook Click ID).
 * @returns O valor do cookie _fbc ou undefined se não for encontrado.
 */
const getFbc = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/_fbc=([^;]+)/);
  return match ? match[1] : undefined;
};


// -- Definições de Tipos de Dados (Interfaces) --

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
interface EventRequest {
  eventName: string;
  userData?: UserData;
  customData?: CustomData;
  eventSourceUrl: string;
  eventId?: string;      // Um ID único para o evento (ajuda na desduplicação)
}

// -- Função Principal de Envio de Evento --

/**
 * Função genérica para enviar um evento para o backend.
 * Ela constrói o payload completo, incluindo dados de rastreamento.
 * 
 * @param payload - O payload do evento a ser enviado.
 */
const sendEventToServer = async (payload: EventRequest) => {
  const fullPayload = {
    ...payload,
    // Dados de identificação técnica que o frontend pode coletar
    fbp: getFbp(),
    fbc: getFbc(),
    // O backend deve adicionar: event_time, user_agent, client_ip_address e action_source ('website')
  };

  try {
    // A rota '/event' no backend será responsável por receber todos os eventos
    await axios.post(`${API_URL}/event`, fullPayload);
    console.log(`Evento '${payload.eventName}' disparado com sucesso para o backend.`);
  } catch (error) {
    console.error(`Erro ao disparar o evento '${payload.eventName}':`, error);
  }
};


// -- Funções Exportadas para Disparar Eventos Específicos --

/**
 * Dispara o evento PageView. Essencial para rastrear visitas em todas as páginas.
 */
export const dispararPageView = () => {
  sendEventToServer({
    eventName: 'PageView',
    eventSourceUrl: window.location.href,
    eventId: `pageview_${Date.now()}`, // ID de evento simples
  });
};

/**
 * Dispara o evento Lead quando um usuário demonstra interesse (ex: preenche um formulário).
 * @param userData - Dados do usuário para Advanced Matching.
 * @param eventId - (Opcional) Um ID único para o evento.
 */
export const dispararLead = (userData: UserData, eventId?: string) => {
  sendEventToServer({
    eventName: 'Lead',
    userData,
    eventSourceUrl: window.location.href,
    eventId: eventId || `lead_${Date.now()}`,
  });
};

/**
 * Dispara o evento InitiateCheckout quando um usuário inicia o processo de checkout.
 * @param userData - (Opcional) Dados do usuário.
 * @param customData - Dados sobre os produtos e valor.
 * @param eventId - (Opcional) Um ID único para o evento.
 */
export const dispararInitiateCheckout = (customData: CustomData, userData?: UserData, eventId?: string) => {
  sendEventToServer({
    eventName: 'InitiateCheckout',
    customData,
    userData,
    eventSourceUrl: window.location.href,
    eventId: eventId || `initiate_checkout_${Date.now()}`,
  });
};

/**
 * Dispara o evento ViewContent quando um usuário visualiza um conteúdo específico (ex: página de produto).
 * @param customData - Dados sobre o conteúdo visualizado.
 * @param eventId - (Opcional) Um ID único para o evento.
 */
export const dispararViewContent = (customData: CustomData, eventId?: string) => {
  sendEventToServer({
      eventName: 'ViewContent',
      customData,
      eventSourceUrl: window.location.href,
      eventId: eventId || `view_content_${Date.now()}`
  });
};

/**
 * Dispara um evento customizado 'ViewContent30s' após o usuário passar 30s na página.
 * Este é um evento customizado e não um evento padrão do Meta.
 */
export const dispararViewContent30s = () => {
  sendEventToServer({
      eventName: 'CustomViewContent30s', // Nomeado como customizado para clareza
      eventSourceUrl: window.location.href,
      eventId: `custom_view_30s_${Date.now()}`
  });
};
