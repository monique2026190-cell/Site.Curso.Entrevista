import { Request, Response } from 'express';
import { sendEvent } from '../services/metaAdsService';

export const handlePageView = (req: Request, res: Response) => {
  sendEvent('PageView');
  res.status(200).send({ message: 'Evento PageView recebido' });
};

export const handleLead = (req: Request, res: Response) => {
  const { userData } = req.body;
  sendEvent('Lead', userData);
  res.status(200).send({ message: 'Evento Lead recebido' });
};

export const handleInitiateCheckout = (req: Request, res: Response) => {
  const { eventData } = req.body;
  sendEvent('InitiateCheckout', null, eventData);
  res.status(200).send({ message: 'Evento InitiateCheckout recebido' });
};

export const handleViewContent30s = (req: Request, res: Response) => {
  sendEvent('ViewContent', null, { content_name: 'Visualizou por 30 segundos' });
  res.status(200).send({ message: 'Evento ViewContent30s recebido' });
};

export const handleViewContent60s = (req: Request, res: Response) => {
  sendEvent('ViewContent', null, { content_name: 'Visualizou por 60 segundos' });
  res.status(200).send({ message: 'Evento ViewContent60s recebido' });
};
