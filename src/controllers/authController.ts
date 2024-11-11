import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services";

export class AuthController {
    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authService = new AuthService();
            const response = await authService.register(req.body);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }
    
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authService = new AuthService();
            const response = await authService.login(req.body.email, req.body.password);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
}