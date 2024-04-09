"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const response_1 = require("../utils/response");
const env_1 = __importDefault(require("../config/env"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { JWT_SECRET } = env_1.default;
const isAuthenticated = (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        return (0, response_1.response)(res, { statusCode: 403, message: 'Token missing' });
    try {
        // on décode le jwt dans le cookie 'token' avec notre secret
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // On ajoute le payload dans la propriété req pour pouvoir l'utiliser dans les routes
        req.push(decoded);
        // On passe au controller ou au mw suivant: tout s'est bien passé
        next();
    }
    catch (err) {
        // Le jwt est invalide: on envoit une 401 l'user n'est pas autorisé à accéder à la ressource
        return (0, response_1.response)(res, { statusCode: 401, message: 'Unauthorized' });
    }
};
exports.isAuthenticated = isAuthenticated;
