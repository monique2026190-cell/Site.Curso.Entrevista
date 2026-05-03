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
exports.sendServerEvent = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const API_VERSION = 'v19.0'; // Use a versão mais recente ou a que preferir
const META_API_URL = `https://graph.facebook.com/${API_VERSION}`;
/**
 * Envia um único evento de servidor para a API de Conversões do Meta.
 *
 * @param serverEvent - O objeto de evento preparado, pronto para ser enviado.
 */
const sendServerEvent = (serverEvent) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { META_PIXEL_ID, META_PIXEL_TOKEN } = config_1.config;
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
        yield axios_1.default.post(url, payload, {
            params: {
                access_token: META_PIXEL_TOKEN,
            }
        });
        console.log(`Evento '${serverEvent.event_name}' enviado com sucesso para a API do Meta.`);
    }
    catch (error) {
        console.error(`Erro ao enviar evento '${serverEvent.event_name}' para a API do Meta:`, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        // É importante logar a resposta do erro da API do Meta para depuração
        throw new Error('Falha na comunicação com a API de Conversões do Meta.');
    }
});
exports.sendServerEvent = sendServerEvent;
