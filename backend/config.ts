import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  META_PIXEL_ID: process.env.META_PIXEL_ID,
  META_PIXEL_TOKEN: process.env.META_PIXEL_TOKEN,
  // Adicione outras variáveis de ambiente que você precisa aqui
};
