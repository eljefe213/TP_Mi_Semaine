"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../../config/env"));
const response_1 = require("../../../utils/response");
const { JWT_SECRET, NODE_ENV } = env_1.default;
const login = (req, res) => {
    /* ici on insérera notre logique d'authentification pour vérifier si les informations saisies
    sont correctes */
    const user = {
        id: "abc"
    };
    // création du JWT (en utilisant notre clé secrete)
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    // écriture du cookie (cross domain) avec comme nom 'token' et comme valeur le JWT crée
    // au dessus
    res.cookie('token', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'strict'
    });
    -(0, response_1.response)(res, { statusCode: 200, message: 'OK' });
};
exports.login = login;
