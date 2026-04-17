import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pinoHttp = require('pino-http');
import { logger } from '../logs/logger.js';
// Cria um middleware de log HTTP usando pino-http e o logger base
export const httpLogger = pinoHttp({
    // Passa a instância do logger Pino que criamos
    logger,
    // Define o nível de log dinamicamente com base no status da resposta
    customLogLevel: (req, res, err) => {
        if (res.statusCode >= 500 || err)
            return 'error'; // Erros de servidor
        if (res.statusCode >= 400)
            return 'warn'; // Erros do cliente
        return 'info'; // Sucesso
    },
    // Mensagem customizada para logs de sucesso
    customSuccessMessage: (req, res) => {
        return `${req.method} ${req.url} - ${res.statusCode}`;
    },
    // Mensagem customizada para logs de erro
    customErrorMessage: (req, res, err) => {
        return `${req.method} ${req.url} - Erro: ${err.message}`;
    },
    // Serializadores para formatar objetos de log específicos (req, res, err)
    serializers: {
        // Serializador para o objeto de requisição (req)
        req: (req) => ({
            method: req.method,
            url: req.url,
            // Obtém o IP real, considerando proxies (como em ambientes de produção/hospedagem)
            ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            userAgent: req.headers['user-agent'],
        }),
        // O serializador da resposta (res) é bom por padrão, não precisa customizar agora
        res: (res) => ({
            statusCode: res.statusCode,
            message: res.statusMessage
        })
    },
});
