import { Request, Response } from 'express';
import Stripe from 'stripe';

type StripeInstance = InstanceType<typeof Stripe>;

let stripe: StripeInstance | null = null;

// Initialize Stripe only if the secret key is available
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10',
  });
  console.log('[Stripe Controller] Stripe SDK initialized.');
} else {
  console.warn('[Stripe Controller] STRIPE_SECRET_KEY not found. Stripe disabled.');
}

// Simulação de DB (substituir depois)
const usersDatabase: { [key: string]: { stripeAccountId?: string } } = {
  'user_123': {},
};

const findOrCreateUserAndGetStripeAccountId = async (userId: string) => {
  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  const user = usersDatabase[userId];
  if (!user) throw new Error('User not found');

  if (user.stripeAccountId) {
    return user.stripeAccountId;
  }

  console.log('Creating new Stripe account...');

  const account = await stripe.accounts.create({
    type: 'express',
    country: 'BR',
    email: 'usuario@exemplo.com',
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  user.stripeAccountId = account.id;

  return account.id;
};

export const criarSessaoConexao = async (req: Request, res: Response) => {
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe is not configured.' });
  }

  try {
    const userId = 'user_123';

    const accountId = await findOrCreateUserAndGetStripeAccountId(userId);

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: process.env.STRIPE_REFRESH_URL!,
      return_url: process.env.STRIPE_RETURN_URL!,
      type: 'account_onboarding',
    });

    res.json({ url: accountLink.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Failed to create Stripe connect session' });
  }
};
