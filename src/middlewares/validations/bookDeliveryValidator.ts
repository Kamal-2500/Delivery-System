import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../../utils";
import { PackageType } from "../../types";

export const validateBookDelivery = [
    body("deliveryId")
        .notEmpty().withMessage("Delivery id is required")
        .bail().isString().withMessage("Delivery id must be a string")
        .bail().isUUID(4).withMessage("Delivery id must be a valid UUID"),

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