"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const metaController_1 = require("../controllers/metaController");
const router = express_1.default.Router();
// Rota única para receber todos os tipos de eventos do frontend
router.post('/event', metaController_1.handleEvent);
exports.default = router;
