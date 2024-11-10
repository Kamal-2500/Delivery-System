import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../../utils";

export const validateLogin = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .bail().isString().withMessage("Email must be a string")
        .bail().isEmail().withMessage("Email must be valid")
        .bail().isLength({ max: 255 }).withMessage("Email must be no longer than 255 characters"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .bail().isString().withMessage("Password must be a string")
        .bail().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new BadRequestError(errors.array()[0].msg);
            }
            next();
        } catch (error) {
            throw error;
        }
    }
];