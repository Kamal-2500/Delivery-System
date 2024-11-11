import { Request, Response, NextFunction } from "express";
import { DelieryService } from "../services";

export class DeliveryController {
    calculateCharges = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deliveryService = new DelieryService();
            const result = await deliveryService.calculateCharges(req.user.id, req.body.pickupLocation, req.body.dropLocation, req.body.packages);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    bookDelivery = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deliveryService = new DelieryService();
            const result = await deliveryService.bookDelivery(req.user.id, req.body.deliveryId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    cancelDelivery = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deliveryService = new DelieryService();
            const result = await deliveryService.cancelDelivery(req.user.id, req.body.bookingId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    getStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deliveryService = new DelieryService();
            const result = await deliveryService.getStatus(req.user.id, req.params.bookingId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}