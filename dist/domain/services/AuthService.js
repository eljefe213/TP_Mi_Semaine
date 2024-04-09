"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../config/env"));
const { REFRESH_SECRET, JWT_SECRET } = env_1.default;
class AuthService {
    refreshTokenStore = new Map();
    // générer un JWT pour un user avec une durée de validité de 15 mn
    issueAccessToken(id) {
        return jsonwebtoken_1.default.sign({ userId: id }, JWT_SECRET, { expiresIn: '15m' });
    }
    refreshAccessToken(refreshToken) {
        try {
            // On vérifie que le token en paramètre est bien valide
            const payload = jsonwebtoken_1.default.verify(refreshToken, REFRESH_SECRET);
            // On récupére ce même token dans notre store
            const storedRefreshToken = this.refreshTokenStore.get(payload.userId);
            // Si ce token existe dans le store, ca implique qu'il est valide.
            if (storedRefreshToken === refreshToken) {
                // On génère un nouveau token de rafraichissement
                const newToken = this.issueAccessToken(payload.userId);
                // On enregistre le nouveau token de rafraichissement
                this.refreshTokenStore.set(payload.userId, newToken);
            }
            else {
                throw new Error('Invalid refresh token');
            }
        }
        catch (err) {
            throw new Error('Invalid refresh token');
        }
    }
}
exports.AuthService = AuthService;
