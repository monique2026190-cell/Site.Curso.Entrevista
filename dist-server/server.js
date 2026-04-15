import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/rotas.js';
import { authMiddleware } from './middleware/middleware.autenticacao.js';
import { httpLogger } from './middleware/logger.middleware.js'; // 1. Importa o logger HTTP
import { logger } from './logs/logger.js'; // 2. Importa o logger base
import initDB from './db/init.db.js'; // Importa a função de inicialização do DB
const app = express();
// --- Middlewares Essenciais ---
// 3. Registra o logger HTTP. Deve ser um dos primeiros middlewares.
app.use(httpLogger);
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- Rotas da API ---
app.use('/api', routes);
app.get('/api/profile', authMiddleware, (req, res) => {
    // Exemplo de log avançado dentro de uma rota, injetado pelo pino-http
    req.log.info({ user: req.user }, 'Acessando rota de perfil protegida');
    res.json(req.user);
});
// --- Servir Arquivos Estáticos (Frontend) ---
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));
// SPA Fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});
// --- Inicialização do Servidor ---
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
// Inicializa o banco de dados e, em seguida, o servidor
initDB().then(() => {
    app.listen(PORT, () => {
        // 4. Usa o logger estruturado para a mensagem de inicialização
        logger.info(`Servidor rodando na porta ${PORT}`);
    });
});
