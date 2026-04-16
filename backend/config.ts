
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env (se existir) para process.env
// Em um ambiente de produção (como o seu serviço de hospedagem), 
// as variáveis serão injetadas diretamente no ambiente do processo.
dotenv.config();

/**
 * Objeto de configuração que exporta as variáveis de ambiente necessárias para a aplicação.
 * Isso centraliza o acesso e a validação das configurações.
 */
export const appConfig = {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  frontendUrl: process.env.FRONTEND_URL,
};

// --- Validação de Variáveis Críticas ---
// Garante que a aplicação não inicie sem as configurações essenciais.

if (!appConfig.googleClientId) {
  console.error("[App Config] ERRO: A variável de ambiente GOOGLE_CLIENT_ID não foi definida.");
  process.exit(1); // Encerra a aplicação se a variável não estiver presente
}

if (!appConfig.stripeSecretKey) {
    console.error("[App Config] ERRO: A variável de ambiente STRIPE_SECRET_KEY não foi definida.");
    process.exit(1);
}

if (!appConfig.stripeWebhookSecret) {
    console.error("[App Config] ERRO: A variável de ambiente STRIPE_WEBHOOK_SECRET não foi definida.");
    process.exit(1);
}

if (!appConfig.frontendUrl) {
    console.error("[App Config] ERRO: A variável de ambiente FRONTEND_URL não foi definida.");
    process.exit(1);
}
