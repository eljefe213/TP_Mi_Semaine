"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv permet de charger les variables d'environnement depuis un fichier .env
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./infrastructure/web/routes"));
const env_1 = __importDefault(require("./config/env"));
const logger_1 = require("./middlewares/logger");
const errorHandler_1 = require("./middlewares/errorHandler");
// Création intance app express
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
// mw pour pouvoir lire les cookies plus facilement
app.use((0, cookie_parser_1.default)());
// Port d'écoute
const { PORT } = env_1.default;
// un middleware est executé avant que la requête n'atteigne la route spécifique
function middleware1(req, res, next) {
    console.log("Middleware 1");
    next();
}
// applique le middleware1 à toutes les requêtes entrantes avant qu'elles n'atteignent les routes
// spécifiques
app.use(logger_1.requestLogger);
// [GET] http://localhost:8000/
app.get("/", middleware1, function (req, res) {
    console.log("Ceci est un console log, qui ne sera JAMAIS affiché dans le navigateur, mais seulement le terminal du serveur (ici terminal vscode)");
    res.send("Hello World pas piqué des hannetons");
});
// [GET] http://localhost:8000/error
app.get('/error', (req, res, next) => {
    const error = new Error('Erreur de test pour montrer les mw d\'erreurs');
    next(error); // pour passer à l'errorHandler
});
app.use(routes_1.default);
// Middleware de gestion d'erreur => toujours tout à la fin des routes et autres mw
app.use(errorHandler_1.errorHandler);
// Faire écouter l'app sur le port spécifié puis afficher msg
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
