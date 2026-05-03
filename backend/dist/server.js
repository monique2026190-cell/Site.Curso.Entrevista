"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const meta_1 = __importDefault(require("./routes/meta"));
// Função para verificar variáveis de ambiente obrigatórias
const verificarVariaveisDeAmbiente = () => {
    const requiredEnvVars = ['META_PIXEL_ID', 'META_PIXEL_TOKEN'];
    const missingEnvVars = requiredEnvVars.filter(key => !config_1.config[key]);
    if (missingEnvVars.length > 0) {
        console.error(`Variáveis de ambiente faltando: ${missingEnvVars.join(', ')}`);
        process.exit(1); // Encerra o processo se alguma variável estiver faltando
    }
};
// Verifica as variáveis de ambiente antes de iniciar o servidor
verificarVariaveisDeAmbiente();
const app = (0, express_1.default)();
// Middleware para processar JSON
app.use(express_1.default.json());
// Servir arquivos estáticos do frontend
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
// Use as rotas do Meta Ads
app.use('/api/meta', meta_1.default);
// Rota catch-all para servir o index.html para todas as outras requisições GET
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/dist/index.html'));
});
const server = http_1.default.createServer(app);
const port = config_1.config.PORT;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
