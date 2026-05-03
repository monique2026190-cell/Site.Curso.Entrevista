import axios from 'axios';

const API_URL = '/api/meta'; // Rota base para os eventos no seu backend

/**
 * Dispara o evento PageView para o backend.
 */
export const dispararPageView = async () => {
  try {
    await axios.post(`${API_URL}/page-view`);
    console.log('Evento PageView disparado com sucesso para o backend.');
  } catch (error) {
    console.error('Erro ao disparar evento PageView:', error);
  }
};

/**
 * Dispara o evento Lead para o backend.
 * @param userData - Dados do usuário, como email.
 */
export const dispararLead = async (userData: { email: string }) => {
  try {
    await axios.post(`${API_URL}/lead`, { userData });
    console.log('Evento Lead disparado com sucesso para o backend.');
  } catch (error) {
    console.error('Erro ao disparar evento Lead:', error);
  }
};

/**
 * Dispara o evento InitiateCheckout para o backend.
 * @param eventData - Dados customizados do evento de checkout.
 */
export const dispararInitiateCheckout = async (eventData: any) => {
  try {
    await axios.post(`${API_URL}/initiate-checkout`, { eventData });
    console.log('Evento InitiateCheckout disparado com sucesso para o backend.');
  } catch (error) {
    console.error('Erro ao disparar evento InitiateCheckout:', error);
  }
};

/**
 * Dispara o evento ViewContent30s para o backend.
 */
export const dispararViewContent30s = async () => {
  try {
    await axios.post(`${API_URL}/view-content-30s`);
    console.log('Evento ViewContent30s disparado com sucesso para o backend.');
  } catch (error) {
    console.error('Erro ao disparar evento ViewContent30s:', error);
  }
};

/**
 * Dispara o evento ViewContent60s para o backend.
 */
export const dispararViewContent60s = async () => {
  try {
    await axios.post(`${API_URL}/view-content-60s`);
    console.log('Evento ViewContent60s disparado com sucesso para o backend.');
  } catch (error) {
    console.error('Erro ao disparar evento ViewContent60s:', error);
  }
};
