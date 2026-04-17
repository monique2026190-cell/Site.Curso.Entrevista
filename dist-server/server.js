import './config.js';
import express from 'express';
import path from 'path';
import routes from './routes/rotas.js';
import { httpLogger } from './middleware/logger.middleware.js';
import { logger } from './logs/logger.js';
import initDB from './db/init.db.js';
const app = express();
app.use(httpLogger);
app.use(express.json());
app.use('/api', routes);
const frontendBuildPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(frontendBuildPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await initDB();
        logger.info({ context: 'Sistema', category: 'Banco', message: 'db.init.success' });
        logger.info({ context: 'Sistema', category: 'Banco', message: 'db.connect.success' });
        app.listen(PORT, () => {
            logger.info({ context: 'Sistema', category: 'Servidor', message: 'server.start', porta: PORT });
            logger.info({ context: 'Sistema', category: 'Frontend', message: 'frontend.available', url: `http://localhost:${PORT}` });
        });
    }
    catch (error) {
        logger.error({ err: error }, 'Falha ao iniciar o servidor:');
        process.exit(1);
    }
};
startServer();
