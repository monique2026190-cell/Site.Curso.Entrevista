import pino from 'pino';
let pinoOptions;
if (process.env.NODE_ENV !== 'production') {
    pinoOptions = {
        level: 'debug',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                ignore: 'pid,hostname,reqId,req,res,responseTime,time,level,context,category,message, ...Object.keys(log)',
                messageFormat: (log, messageKey) => {
                    const { levelLabel = 'info', context, category, responseTime, userId, email, nome, ip, status, method, url, err } = log;
                    const eventMap = {
                        'auth.login.attempt': 'Tentativa de login',
                        'auth.login.success': 'Login realizado',
                        'auth.login.error': 'Erro no login',
                        'auth.session.restore': 'Restaurando sessão',
                        'db.init.success': 'Inicialização concluída',
                        'db.connect.success': 'Conexão estabelecida',
                        'server.start': 'Servidor iniciado',
                        'frontend.available': 'Disponível em',
                    };
                    let emoji = '➡️';
                    let translatedMessage = eventMap[log[messageKey]] || log[messageKey] || '';
                    const categoryEmojis = {
                        'Banco': '🗄️',
                        'Servidor': '🚀',
                        'Frontend': '🔗',
                        'API': '🌐'
                    };
                    if (method && url) {
                        emoji = /\.(ico|png|jpg|svg|css|woff2)$/.test(url) ? '🖼️' : '🌐';
                    }
                    else if (category && categoryEmojis[category]) {
                        emoji = categoryEmojis[category];
                    }
                    else {
                        const levelEmojis = {
                            info: 'ℹ️', warn: '⚠️', error: '❌', fatal: '💀', debug: '🐛',
                        };
                        emoji = levelEmojis[levelLabel] || '➡️';
                    }
                    const hierarchy = [context, category].filter(Boolean).join(' > ');
                    let mainContent = '';
                    if (method && url) {
                        const statusCode = status || log.res?.statusCode;
                        mainContent += `${method} ${url}`;
                        if (statusCode)
                            mainContent += ` | ${statusCode >= 400 ? '❗️' : '✅'} ${statusCode}`;
                        if (responseTime)
                            mainContent += ` | ⏱️ ${responseTime}ms`;
                    }
                    else {
                        mainContent = translatedMessage;
                    }
                    let finalMsg = `${emoji} ${hierarchy ? `${hierarchy} > ` : ''}${mainContent}`;
                    const ignoredDetails = new Set(['level', 'time', 'pid', 'hostname', 'levelLabel', 'context', 'category', 'message', messageKey, 'err', 'stack']);
                    const details = Object.keys(log)
                        .filter(key => !ignoredDetails.has(key))
                        .map(key => `${key}: ${log[key]}`);
                    if (details.length > 0) {
                        finalMsg += ` | ${details.join(' | ')}`;
                    }
                    if (err) {
                        finalMsg += ` | ${err.stack || err.message}`;
                    }
                    return finalMsg;
                },
            },
        },
        formatters: {
            level(label) {
                return { levelLabel: label };
            },
        },
    };
}
else {
    pinoOptions = {
        level: 'info',
        formatters: {
            level(label) {
                return { level: label };
            },
        },
    };
}
const logger = pino(pinoOptions);
export { logger };
