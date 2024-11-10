import { Request, Response, NextFunction } from "express";
import { JWTUtils, UnauthorizedError } from "../utils";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedError("Invalid token");
        }

        const token = authHeader!.split(' ')[1];

        let decoded: any;
        try {
            decoded = JWTUtils.verifyToken(token);
        } catch (error) {
            throw new UnauthorizedError("Invalid token");
        }

        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};