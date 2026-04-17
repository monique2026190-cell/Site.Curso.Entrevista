import './config.js';
import cluster from 'cluster';
import os from 'os';
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
// Use createRequire to import CommonJS module in ES module
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pinoHttp = require('pino-http');
import logger from './logger.js';
import routes from './routes/rotas.js';
import initDB from './db/init.db.js';
import pool from './db/pool.js';
const PORT = process.env.PORT || 3000;
const numCPUs = os.cpus().length;
const isProduction = process.env.NODE_ENV === 'production';
if (cluster.isPrimary) {
    logger.info(`Master ${process.pid} rodando`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        logger.warn(`Worker ${worker.process.pid} morreu. Reiniciando...`);
        cluster.fork();
    });
}
else {
    const app = express();
    app.set('trust proxy', 1);
    app.use(helmet());
    app.use(compression());
    app.use(cors({ origin: process.env.FRONTEND_URL || false }));
    app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000, standardHeaders: true, legacyHeaders: false }));
    app.use(express.json());
    // Pino HTTP logger middleware
    app.use(pinoHttp({ logger }));
    app.use('/api', routes);
    const frontendBuildPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(frontendBuildPath));
    app.get('*', (req, res, next) => {
        if (req.originalUrl.startsWith('/api'))
            return next();
        res.sendFile(path.join(frontendBuildPath, 'index.html'));
    });
    app.use((err, req, res, next) => {
        // @ts-ignore
        req.log.error(err, 'Erro não tratado capturado');
        const status = err.status || 500;
        const message = (isProduction && status === 500) ? 'Erro interno do servidor' : err.message;
        res.status(status).json({ error: message });
    });
    const start = async () => {
        try {
            await initDB();
            logger.info('Banco de dados inicializado com sucesso.');
            const server = app.listen(PORT, () => {
                logger.info(`Worker ${process.pid} rodando na porta ${PORT}`);
            });
            const shutdown = async (signal) => {
                logger.info(`${signal} recebido. Encerrando worker ${process.pid}...`);
                await pool.end();
                logger.info('Conexão com o banco de dados fechada.');
                server.close(() => {
                    logger.info('Servidor web fechado.');
                    process.exit(0);
                });
            };
            process.on('SIGINT', () => shutdown('SIGINT'));
            process.on('SIGTERM', () => shutdown('SIGTERM'));
        }
        catch (err) {
            logger.fatal(err, 'Erro fatal ao iniciar o worker');
            process.exit(1);
        }
    };
    start();
}
