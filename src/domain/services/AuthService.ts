import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import env from '../../config/env';

const { REFRESH_SECRET, JWT_SECRET } = env;

export class AuthService {
    private refreshTokenStore: Map<string, string> = new Map();

    // générer un JWT pour un user avec une durée de validité de 15 mn
    issueAccessToken(id: string): string {
        return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '15m' });
    }

    refreshAccessToken(refreshToken: string): string | void {
        try {
            // On vérifie que le token en paramètre est bien valide
            const payload = jwt.verify(refreshToken, REFRESH_SECRET) as jwt.JwtPayload;

            // On récupére ce même token dans notre store
            const storedRefreshToken = this.refreshTokenStore.get(payload.userId);

            // Si ce token existe dans le store, ca implique qu'il est valide.
            if (storedRefreshToken === refreshToken) {
                // On génère un nouveau token de rafraichissement
                const newToken = this.issueAccessToken(payload.userId);
                
                // On enregistre le nouveau token de rafraichissement
                this.refreshTokenStore.set(payload.userId, newToken);
            } else {
                throw new Error('Invalid refresh token');
            }
        } catch(err) {
            throw new Error('Invalid refresh token');
        }
    }
}