import { Request, Response } from 'express';
import { sendServerEvent } from '../services/metaAdsService';

// Interface para o payload que vem do frontend
interface FrontendEventPayload {
    eventName: string;
    userData?: any; // Os tipos exatos são definidos no frontend
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

    const serverEvent = {
        event_name: payload.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: payload.eventSourceUrl,
        action_source: 'website' as const, // Correção para o tipo literal
        event_id: payload.eventId,
        user_data: {
            ...payload.userData,
            client_ip_address: req.ip,
            client_user_agent: req.headers['user-agent'],
            fbp: payload.fbp,
            fbc: payload.fbc,
        },
        custom_data: payload.customData,
    };

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
