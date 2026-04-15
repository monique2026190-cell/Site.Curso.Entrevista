import express from 'express';
import path from 'path';

const app = express();
const __dirname = new URL('.', import.meta.url).pathname;

// Sirva os arquivos estáticos da pasta 'dist'
app.use(express.static(path.join(__dirname, '../dist')));

// Para qualquer outra rota, sirva o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
