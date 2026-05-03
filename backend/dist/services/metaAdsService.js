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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEvent = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const PIXEL_ID = config_1.config.META_PIXEL_ID;
const ACCESS_TOKEN = config_1.config.META_PIXEL_TOKEN;
const sendEvent = (eventName, userData, customData) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield axios_1.default.post(url, payload);
        console.log(`Evento ${eventName} enviado com sucesso para a API de Conversões do Meta.`);
    }
    catch (error) {
        console.error(`Erro ao enviar o evento ${eventName} para a API de Conversões do Meta:`, error.response.data);
    }
});
exports.sendEvent = sendEvent;
