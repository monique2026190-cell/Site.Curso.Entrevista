import express from 'express';
import * as metaController from '../controllers/metaController';

const router = express.Router();

router.post('/page-view', metaController.handlePageView);
router.post('/lead', metaController.handleLead);
router.post('/initiate-checkout', metaController.handleInitiateCheckout);
router.post('/view-content-30s', metaController.handleViewContent30s);
router.post('/view-content-60s', metaController.handleViewContent60s);

export default router;
