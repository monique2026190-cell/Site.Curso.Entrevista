"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleViewContent60s = exports.handleViewContent30s = exports.handleInitiateCheckout = exports.handleLead = exports.handlePageView = void 0;
const metaAdsService_1 = require("../services/metaAdsService");
const handlePageView = (req, res) => {
    (0, metaAdsService_1.sendEvent)('PageView');
    res.status(200).send({ message: 'Evento PageView recebido' });
};
exports.handlePageView = handlePageView;
const handleLead = (req, res) => {
    const { userData } = req.body;
    (0, metaAdsService_1.sendEvent)('Lead', userData);
    res.status(200).send({ message: 'Evento Lead recebido' });
};
exports.handleLead = handleLead;
const handleInitiateCheckout = (req, res) => {
    const { eventData } = req.body;
    (0, metaAdsService_1.sendEvent)('InitiateCheckout', null, eventData);
    res.status(200).send({ message: 'Evento InitiateCheckout recebido' });
};
exports.handleInitiateCheckout = handleInitiateCheckout;
const handleViewContent30s = (req, res) => {
    (0, metaAdsService_1.sendEvent)('ViewContent', null, { content_name: 'Visualizou por 30 segundos' });
    res.status(200).send({ message: 'Evento ViewContent30s recebido' });
};
exports.handleViewContent30s = handleViewContent30s;
const handleViewContent60s = (req, res) => {
    (0, metaAdsService_1.sendEvent)('ViewContent', null, { content_name: 'Visualizou por 60 segundos' });
    res.status(200).send({ message: 'Evento ViewContent60s recebido' });
};
exports.handleViewContent60s = handleViewContent60s;
