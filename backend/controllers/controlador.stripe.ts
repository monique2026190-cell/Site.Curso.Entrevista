
import { Request, Response } from 'express';
import Stripe from 'stripe';

let stripe: Stripe | null = null;

// Initialize Stripe only if the secret key is available
if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
    console.log('[Stripe Controller] Stripe SDK initialized.');
} else {
    console.warn('[Stripe Controller] STRIPE_SECRET_KEY not found. Stripe functionality will be disabled.');
}


// This is a placeholder for your database logic.
// In a real application, you would fetch the user from your database.
const findOrCreateUserAndGetStripeAccountId = async (userId: string) => {
    if (!stripe) {
        console.error('Stripe is not initialized. Cannot create or find Stripe account.');
        throw new Error('Stripe is not configured on the server.');
    }
  // --- DATABASE LOGIC START ---
  // For this example, we'll use a simple in-memory object to simulate a database.
  const usersDatabase: { [key: string]: { stripeAccountId?: string } } = {
    'user_123': { stripeAccountId: undefined }, // Simulate a user who doesn't have an ID yet
  };

  const user = usersDatabase[userId];
  if (!user) throw new Error('User not found');

  if (user.stripeAccountId) {
    console.log('User already has a Stripe Account ID:', user.stripeAccountId);
    return user.stripeAccountId;
  }
  // --- DATABASE LOGIC END ---

  // If no Stripe account ID exists, create a new Stripe Express account for the user
  console.log('No Stripe Account ID found. Creating a new account...');
  const account = await stripe.accounts.create({
    type: 'express',
    country: 'BR', // Example country, adjust as needed
    email: 'usuario@exemplo.com', // Get the user's email from your database
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  // --- DATABASE LOGIC START ---
  // Save the new account ID to your database, associated with the user
  user.stripeAccountId = account.id;
  console.log('New Stripe Account created and saved to DB:', user.stripeAccountId);
  // --- DATABASE LOGIC END ---

  return account.id;
};

export const criarSessaoConexao = async (req: Request, res: Response) => {
    if (!stripe) {
        console.warn('Stripe is not configured. Cannot create connect session.');
        return res.status(500).json({ error: 'Stripe is not configured on the server.' });
    }
  try {
    // In a real app, you'd get the user ID from the authenticated session
    const userId = 'user_123'; 

    // Get the user's Stripe Account ID from your database, or create one if it doesn't exist
    const accountId = await findOrCreateUserAndGetStripeAccountId(userId);

    // Create the Account Link for the onboarding process
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: process.env.STRIPE_REFRESH_URL as string,
      return_url: process.env.STRIPE_RETURN_URL as string,
      type: 'account_onboarding',
    });

    // Return the URL to the frontend
    res.json({ url: accountLink.url });
  } catch (error) {
    console.error('Error creating Stripe connect session:', error);
    res.status(500).json({ error: 'Failed to create Stripe connect session' });
  }
};
