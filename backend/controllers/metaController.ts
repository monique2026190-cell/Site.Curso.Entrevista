import { Request, Response } from 'express';
import { sendServerEvent } from '../services/metaAdsService';
import crypto from 'crypto';
import axios from 'axios'; // Import axios

// Função para obter localização do endereço IP
async function getLocationFromIp(ip: string) {
    // Não buscar IPs de localhost ou inválidos
    if (!ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')) {
        return {};
    }
    try {
        // Usando um serviço de geolocalização de IP gratuito (substitua se tiver um preferido)
        const response = await axios.get(`http://ip-api.com/json/${ip}?fields=status,message,region,city`);
        if (response.data.status === 'success') {
            return {
                st: response.data.region, // Estado (Region)
                ct: response.data.city,   // Cidade (City)
            };
        } else {
            console.warn(`Não foi possível geolocalizar o IP ${ip}: ${response.data.message}`);
            return {};
        }
    } catch (error) {
        console.error(`Erro durante a geolocalização do IP ${ip}:`, error);
        return {};
    }
}

function hashData(data: string) {
  return crypto
    .createHash('sha256')
    .update(data.trim().toLowerCase())
    .digest('hex');
}

// Interface para o payload que vem do frontend
interface FrontendEventPayload {
    eventName: string;
    userData?: {
        em?: string;
        ph?: string;
        external_id?: string;
        subscription_id?: string; // Para Facebook Login ID
        [key: string]: any;
    };
    customData?: any;
    eventSourceUrl: string;
    eventId?: string;
    fbp?: string;
    fbc?: string;
}

export const handleEvent = async (req: Request, res: Response) => {
    const payload: FrontendEventPayload = req.body;

    if (!payload.eventName || !payload.eventSourceUrl) {
        return res.status(400).json({ message: 'eventName e eventSourceUrl são obrigatórios.' });
    }

    const ipHeader = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ip = Array.isArray(ipHeader) ? ipHeader[0] : ipHeader?.split(',')[0].trim();

    // Obter localização a partir do IP
    const locationData = await getLocationFromIp(ip || '');

    const userData: { [key: string]: any } = {
        ...payload.userData,
        client_ip_address: ip,
        client_user_agent: req.headers['user-agent'],
        fbp: payload.fbp,
        fbc: payload.fbc,
        external_id: payload.userData?.external_id,
        subscription_id: payload.userData?.subscription_id,
        ...locationData, // Adicionar st (estado) e ct (cidade) da geolocalização
    };

    if (userData.em && typeof userData.em === 'string') {
        userData.em = hashData(userData.em);
    }
    
    if (userData.email) {
        delete userData.email;
    }

    const serverEvent = {
        event_name: payload.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: payload.eventSourceUrl,
        action_source: 'website' as const, // Correção para o tipo literal
        event_id: payload.eventId,
        user_data: userData,
        custom_data: payload.customData,
    };

    // Remover quaisquer campos user_data que sejam undefined ou null
    Object.keys(serverEvent.user_data).forEach(key => {
        if (serverEvent.user_data[key as keyof typeof serverEvent.user_data] === undefined || serverEvent.user_data[key as keyof typeof serverEvent.user_data] === null) {
            delete serverEvent.user_data[key as keyof typeof serverEvent.user_data];
        }
    });

    try {
        await sendServerEvent(serverEvent);
        res.status(200).json({ message: `Evento '${payload.eventName}' processado com sucesso.` });
    } catch (error) {
        console.error(`Falha ao processar o evento '${payload.eventName}':`, error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};
