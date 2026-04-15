
import pg from 'pg';

const { Pool } = pg;

// Configura o pool de conexões usando a variável de ambiente DATABASE_URL
// que é fornecida por serviços como o Render.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Em ambientes de produção, a conexão SSL é geralmente necessária.
    // A configuração pode variar dependendo do provedor de hospedagem.
    rejectUnauthorized: false,
  },
});

export default pool;
