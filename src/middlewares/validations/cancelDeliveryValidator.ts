import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../../utils";
import { PackageType } from "../../types";

export const validateCancelDelivery = [
    body("bookingId")
        .notEmpty().withMessage("Booking id is required")
        .bail().isString().withMessage("Booking id must be a string")
        .bail().isUUID(4).withMessage("Booking id must be a valid UUID"),

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