import axios from 'axios';
import { config } from '../config';

const PIXEL_ID = config.META_PIXEL_ID;
const ACCESS_TOKEN = config.META_PIXEL_TOKEN;

interface UserData {
  // Defina os campos que você espera em userData
  [key: string]: any;
}

interface CustomData {
  // Defina os campos que você espera em customData
  [key: string]: any;
}

export const sendEvent = async (eventName: string, userData?: UserData | null, customData?: CustomData) => {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('As variáveis de ambiente META_PIXEL_ID e META_ACCESS_TOKEN não estão definidas.');
    return;
  }

  const url = `https://graph.facebook.com/v13.0/${PIXEL_ID}/events`;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        user_data: userData,
        custom_data: customData,
      },
    ],
    access_token: ACCESS_TOKEN,
  };

  try {
    await axios.post(url, payload);
    console.log(`Evento ${eventName} enviado com sucesso para a API de Conversões do Meta.`);
  } catch (error: any) {
    console.error(`Erro ao enviar o evento ${eventName} para a API de Conversões do Meta:`, error.response.data);
  }
};
