import express from 'express';
import http from 'http';
import { config } from './config';
import metaRoutes from './routes/meta';

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Use as rotas do Meta Ads
app.use('/api/meta', metaRoutes);

const server = http.createServer(app);

const port = config.PORT;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
