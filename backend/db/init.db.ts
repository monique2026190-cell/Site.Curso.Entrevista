
import fs from 'fs/promises';
import path from 'path';
import pool from './pool.js';
import { logger } from '../logs/logger.js';

const initDB = async () => {
  try {
    // Lê o arquivo SQL que define a estrutura do banco de dados
    const sql = await fs.readFile(path.join(__dirname, 'tables.sql'), 'utf-8');

    // Conecta ao banco de dados e executa o script SQL
    const client = await pool.connect();
    await client.query(sql);
    client.release();

    logger.info('Banco de dados inicializado com sucesso.');
  } catch (error) {
    logger.error({ err: error }, 'Erro ao inicializar o banco de dados:');
    // Encerra o processo se a inicialização do banco de dados falhar,
    // pois o aplicativo não pode funcionar sem um banco de dados.
    process.exit(1);
  }
};

export default initDB;
