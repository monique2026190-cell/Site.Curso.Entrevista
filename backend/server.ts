import express from 'express';
import http from 'http';
import path from 'path';
import { config } from './config';
import metaRoutes from './routes/meta';

// Função para verificar variáveis de ambiente obrigatórias
const verificarVariaveisDeAmbiente = () => {
  const requiredEnvVars = ['META_PIXEL_ID', 'META_PIXEL_TOKEN'];
  const missingEnvVars = requiredEnvVars.filter(key => !config[key as keyof typeof config]);

  if (missingEnvVars.length > 0) {
    console.error(`Variáveis de ambiente faltando: ${missingEnvVars.join(', ')}`);
    process.exit(1); // Encerra o processo se alguma variável estiver faltando
  }
};

// Verifica as variáveis de ambiente antes de iniciar o servidor
verificarVariaveisDeAmbiente();

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Use as rotas do Meta Ads
app.use('/api/meta', metaRoutes);

// Rota catch-all para servir o index.html para todas as outras requisições GET
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

const server = http.createServer(app);

const port = config.PORT;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
