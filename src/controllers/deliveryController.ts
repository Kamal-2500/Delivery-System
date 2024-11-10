import { Request, Response, NextFunction } from "express";
import { DelieryService } from "../services";

export class DeliveryController {
    calculateCharges = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deliveryService = new DelieryService();
            const result = await deliveryService.calculateCharges(req.body.pickupLocation, req.body.dropLocation, req.body.packages);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    bookDelivery = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deliveryService = new DelieryService();
            const result = await deliveryService.bookDelivery(req.user.id, req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    cancelDelivery = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deliveryService = new DelieryService();
            const result = await deliveryService.cancelDelivery(req.user.id, Number(req.params.deliveryId));
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}