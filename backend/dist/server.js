"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const config_1 = require("./config");
const meta_1 = __importDefault(require("./routes/meta"));
const app = (0, express_1.default)();
// Middleware para processar JSON
app.use(express_1.default.json());
// Use as rotas do Meta Ads
app.use('/api/meta', meta_1.default);
const server = http_1.default.createServer(app);
const port = config_1.config.PORT;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
