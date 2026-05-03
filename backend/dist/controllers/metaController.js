"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEvent = void 0;
const metaAdsService_1 = require("../services/metaAdsService");
const handleEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    if (!payload.eventName || !payload.eventSourceUrl) {
        return res.status(400).json({ message: 'eventName e eventSourceUrl são obrigatórios.' });
    }
    const serverEvent = {
        event_name: payload.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: payload.eventSourceUrl,
        action_source: 'website', // Correção para o tipo literal
        event_id: payload.eventId,
        user_data: Object.assign(Object.assign({}, payload.userData), { client_ip_address: req.ip, client_user_agent: req.headers['user-agent'], fbp: payload.fbp, fbc: payload.fbc }),
        custom_data: payload.customData,
    };
    Object.keys(serverEvent.user_data).forEach(key => {
        if (serverEvent.user_data[key] === undefined || serverEvent.user_data[key] === null) {
            delete serverEvent.user_data[key];
        }
    });
    try {
        yield (0, metaAdsService_1.sendServerEvent)(serverEvent);
        res.status(200).json({ message: `Evento '${payload.eventName}' processado com sucesso.` });
    }
    catch (error) {
        console.error(`Falha ao processar o evento '${payload.eventName}':`, error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});
exports.handleEvent = handleEvent;
