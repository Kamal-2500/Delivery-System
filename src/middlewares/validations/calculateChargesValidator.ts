import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../../utils";
import { PackageType } from "../../types";

export const validateCalculateCharges = [
    // Pickup location validation

    body("pickupLocation")
        .exists().withMessage("Pickup location is required")
        .bail().isObject().withMessage("Pickup location must be an object"),

    body("pickupLocation.latitude")
        .exists().withMessage("Pickup latitude is required")
        .bail().isNumeric().withMessage("Pickup latitude must be a number")
        .bail().custom((value) => {
            if (Array.isArray(value)) {
                return false;
            }
            return true;
        }).withMessage("Pickup latitude must be a number")
        .bail().isFloat({ min: -90, max: 90 }).withMessage("Pickup latitude must be a valid number between -90 and 90"),

    body("pickupLocation.longitude")
        .exists().withMessage("Pickup longitude is required")
        .bail().isNumeric().withMessage("Pickup longitude must be a number")
        .bail().custom((value) => {
            if (Array.isArray(value)) {
                return false;
            }
            return true;
        }).withMessage("Pickup longitude must be a number")
        .bail().isFloat({ min: -180, max: 180 }).withMessage("Pickup longitude must be a valid number between -180 and 180"),

    body("pickupLocation.address")
        .notEmpty().withMessage("Pickup address is required")
        .bail().isString().withMessage("Pickup address must be a string"),

    body("pickupLocation.city")
        .optional()
        .isString().withMessage("Pickup city must be a string")
        .bail().isLength({ max: 100 }).withMessage("Pickup city must be no longer than 100 characters"),

    body("pickupLocation.state")
        .optional()
        .isString().withMessage("Pickup state must be a string")
        .bail().isLength({ max: 100 }).withMessage("Pickup state must be no longer than 100 characters"),

    body("pickupLocation.postalCode")
        .notEmpty().withMessage("Pickup postal code is required")
        .bail().isString().withMessage("Pickup postal code must be a string")
        .bail().isLength({ min: 6, max: 6 }).withMessage("Pickup postal code must be 6 digits long")
        .bail().matches(/^\d+$/).withMessage("Pickup postal code must contain only digits"),

    // Drop location validation
    body("dropLocation").exists().withMessage("Drop location is required")
        .bail().isObject().withMessage("Drop location must be an object"),

    body("dropLocation.latitude")
        .exists().withMessage("Drop latitude is required")
        .bail().isNumeric().withMessage("Drop latitude must be a number")
        .bail().custom((value) => {
            if (Array.isArray(value)) {
                return false;
            }
            return true;
        }).withMessage("Drop latitude must be a number")
        .bail().isFloat({ min: -90, max: 90 }).withMessage("Drop latitude must be a valid number between -90 and 90"),

    body("dropLocation.longitude")
        .exists().withMessage("Drop longitude is required")
        .bail().isNumeric().withMessage("Drop longitude must be a number")
        .bail().custom((value) => {
            if (Array.isArray(value)) {
                return false;
            }
            return true;
        }).withMessage("Drop longitude must be a number")
        .bail().isFloat({ min: -180, max: 180 }).withMessage("Drop longitude must be a valid number between -180 and 180"),

    body("dropLocation.address")
        .notEmpty().withMessage("Drop address is required")
        .bail().isString().withMessage("Drop address must be a string"),

    body("dropLocation.city")
        .optional()
        .isString().withMessage("Drop city must be a string")
        .bail().isLength({ max: 100 }).withMessage("Drop city must be no longer than 100 characters"),

    body("dropLocation.state")
        .optional()
        .isString().withMessage("Drop state must be a string")
        .bail().isLength({ max: 100 }).withMessage("Drop state must be no longer than 100 characters"),

    body("dropLocation.postalCode")
        .notEmpty().withMessage("Drop postal code is required")
        .bail().isString().withMessage("Drop postal code must be a string")
        .bail().isLength({ min: 6, max: 6 }).withMessage("Drop postal code must be 6 digits long")
        .bail().matches(/^\d+$/).withMessage("Drop postal code must contain only digits"),


    // Package details validation
    body("packages").exists().withMessage("Packages is required")
        .bail().isArray().withMessage("Packages must be an array"),

    body("packages").custom((value: any) => value.length > 0).withMessage("At least one package is required"),

    body("packages.*.weight")
        .exists().withMessage("Package weight is required")
        .bail().isNumeric().withMessage("Weight must be a number")
        .bail().custom((value) => {
            if (Array.isArray(value)) {
                return false;
            }
            return true;
        }).withMessage("Weight must be a number")
        .bail().isFloat({ min: 0.1 }).withMessage("Weight must be greater than 0"),


    body("packages.*.height")
        .exists().withMessage("Package height is required")
        .bail().isNumeric().withMessage("Height must be a number")
        .bail().custom((value) => {
            if (Array.isArray(value)) {
                return false;
            }
            return true;
        }).withMessage("Height must be a number")
        .bail().isFloat({ min: 0.1 }).withMessage("Height must be greater than 0"),

    body("packages.*.width")
        .exists().withMessage("Package width is required")
        .bail().isNumeric().withMessage("Width must be a number")
        .bail().custom((value) => {
            if (Array.isArray(value)) {
                return false;
            }
            return true;
        }).withMessage("Width must be a number")
        .bail().isFloat({ min: 0.1 }).withMessage("Width must be greater than 0"),

    body("packages.*.length")
        .exists().withMessage("Package length is required")
        .bail().isNumeric().withMessage("Length must be a number")
        .bail().custom((value) => {
            if (Array.isArray(value)) {
                return false;
            }
            return true;
        }).withMessage("Length must be a number")
        .bail().isFloat({ min: 0.1 }).withMessage("Length must be greater than 0"),

    body("packages.*.type")
        .notEmpty().withMessage("Package type is required")
        .bail().isString().withMessage("Package type must be a string")
        .bail().isIn(Object.values(PackageType)).withMessage("Invalid product type"),

    body("packages.*.description")
        .optional()
        .isString().withMessage("Description must be a string")
        .bail().isLength({ max: 200 }).withMessage("Description must be no longer than 200 characters"),

    body("packages.*.amount")
        .optional()
        .isNumeric().withMessage("Amount must be a number")
        .bail().custom((value) => {
            if (Array.isArray(value)) {
                return false;
            }
            return true;
        }).withMessage("Amount must be a number")
        .bail().isFloat({ min: 1 }).withMessage("Amount must be greater than or equal to 1"),

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