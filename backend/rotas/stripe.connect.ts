
import express from 'express';
import Stripe from 'stripe';
import { appConfig } from '../config';
import { verificarToken } from '../middleware/auth'; 
import { pool } from '../db/db';

const router = express.Router();

// Inicializa o cliente Stripe com a chave secreta
const stripe = new Stripe(appConfig.stripeSecretKey!, {
  apiVersion: '2024-04-10',
  typescript: true
});

/**
 * @route   POST /api/stripe/connect/account
 * @desc    Cria uma conta Stripe Connect e gera um link de onboarding
 * @access  Privado
 */
router.post('/account', verificarToken, async (req: any, res) => {
  const userId = req.usuario.id;
  const userEmail = req.usuario.email;

  try {
    // 1. Verifica se o usuário já possui uma conta Stripe
    const userResult = await pool.query('SELECT stripe_account_id FROM usuarios WHERE id = $1', [userId]);
    let accountId = userResult.rows[0]?.stripe_account_id;

    // 2. Se não tiver, cria uma nova conta Express no Stripe
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'BR', // O país pode ser ajustado conforme necessário
        email: userEmail,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });
      accountId = account.id;

      // Salva o ID da nova conta no banco de dados
      await pool.query('UPDATE usuarios SET stripe_account_id = $1 WHERE id = $2', [accountId, userId]);
    }

    // 3. Cria um link de onboarding para o usuário completar o cadastro no Stripe
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${appConfig.frontendUrl}/stripe/reauth`, // URL para onde o usuário será redirecionado se o link expirar
      return_url: `${appConfig.frontendUrl}/painel-vendedor?stripe_return=true`, // URL de retorno após a conclusão
      type: 'account_onboarding',
    });

    // 4. Retorna a URL do link de onboarding para o frontend
    res.json({ url: accountLink.url });

  } catch (error) {
    console.error('Erro ao criar conta Stripe Connect:', error);
    res.status(500).json({ error: 'Falha ao iniciar o processo de conexão com o Stripe.' });
  }
});

/**
 * @route   GET /api/stripe/connect/account/status
 * @desc    Verifica o status da conta Stripe de um usuário
 * @access  Privado
 */
router.get('/account/status', verificarToken, async (req: any, res) => {
    const userId = req.usuario.id;

    try {
        const userResult = await pool.query('SELECT stripe_account_id FROM usuarios WHERE id = $1', [userId]);
        const accountId = userResult.rows[0]?.stripe_account_id;

        if (!accountId) {
            return res.json({ isConnected: false });
        }

        const account = await stripe.accounts.retrieve(accountId);

        // Considera a conta conectada se os pagamentos e as transferências estiverem habilitados
        const isConnected = account.charges_enabled && account.payouts_enabled;

        res.json({ isConnected });

    } catch (error) {
        console.error('Erro ao verificar status da conta Stripe:', error);
        res.status(500).json({ error: 'Falha ao verificar o status da conta Stripe.' });
    }
});

export default router;
