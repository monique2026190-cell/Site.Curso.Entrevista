import axios from 'axios';
import { config } from '../config';

const API_VERSION = 'v19.0'; // Use a versão mais recente ou a que preferir
const META_API_URL = `https://graph.facebook.com/${API_VERSION}`;

/**
 * Representa a estrutura completa de um evento de servidor enviado para a API de Conversões.
 * A API espera que os dados estejam dentro de um array 'data'.
 */
interface ServerEvent {
    event_name: string;
    event_time: number;
    event_source_url: string;
    action_source: 'website';
    event_id?: string;
    user_data: {
        client_ip_address?: string;
        client_user_agent?: string;
        [key: string]: any; // Para outros campos como em, ph, etc.
    };
    custom_data?: {
        [key: string]: any;
    };
}

/**
 * Envia um único evento de servidor para a API de Conversões do Meta.
 * 
 * @param serverEvent - O objeto de evento preparado, pronto para ser enviado.
 */
export const sendServerEvent = async (serverEvent: ServerEvent) => {
    const { META_PIXEL_ID, META_PIXEL_TOKEN } = config;

    if (!META_PIXEL_ID || !META_PIXEL_TOKEN) {
        // A verificação já acontece no server.ts, mas é uma boa prática ter aqui também
        console.error('Pixel ID ou Token de Acesso do Meta não estão configurados.');
        throw new Error('Credenciais do Meta não encontradas.');
    }

    const url = `${META_API_URL}/${META_PIXEL_ID}/events`;

    // A API espera um payload com um array de eventos chamado 'data'
    const payload = {
        data: [serverEvent],
        // O token de acesso é enviado como um parâmetro na URL
    };

    try {
        console.log('Enviando evento para a API do Meta:', JSON.stringify(payload, null, 2));

        await axios.post(url, payload, {
            params: {
                access_token: META_PIXEL_TOKEN,
            }
        });

        console.log(`Evento '${serverEvent.event_name}' enviado com sucesso para a API do Meta.`);
    } catch (error: any) {
        console.error(`Erro ao enviar evento '${serverEvent.event_name}' para a API do Meta:`, error.response?.data || error.message);
        // É importante logar a resposta do erro da API do Meta para depuração
        throw new Error('Falha na comunicação com a API de Conversões do Meta.');
    }
};
