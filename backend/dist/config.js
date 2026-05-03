"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    PORT: process.env.PORT || 3000,
    META_PIXEL_ID: process.env.META_PIXEL_ID,
    META_PIXEL_TOKEN: process.env.META_PIXEL_TOKEN,
    // Adicione outras variáveis de ambiente que você precisa aqui
};
