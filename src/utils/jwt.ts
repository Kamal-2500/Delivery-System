import jwt from 'jsonwebtoken';
import { configs } from '../configs';
import { User } from '../models';

export class JWTUtils {

    /**
     * Generates a JWT token for the given user.
     * @param user The user to generate the token for.
     * @returns The generated JWT token.
     */
    public static generateToken(user: Partial<User>): string {
        try {
            return jwt.sign({
                id: user.id!,
                email: user.email!
            },
                configs.jwt.secret,
                { expiresIn: configs.jwt.expiresIn });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Verifies a JWT token using the secret from the configuration.
     * @param token The JWT token to be verified.
     * @returns The decoded payload.
     */
    public static verifyToken(token: string): any {
        try {
            return jwt.verify(token, configs.jwt.secret);

        } catch (error) {
            throw error;
        }
    };
}