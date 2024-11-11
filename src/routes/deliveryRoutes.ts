import express from "express";
import { DeliveryController } from "../controllers";
import { authenticate, validateCalculateCharges, validateBookDelivery, validateCancelDelivery } from "../middlewares";

export const deliveryRouter = express.Router();

const deliveryController = new DeliveryController();

deliveryRouter.post("/calculate-charges", authenticate, validateCalculateCharges, deliveryController.calculateCharges);
deliveryRouter.post("/book", authenticate, validateBookDelivery, deliveryController.bookDelivery);
deliveryRouter.post("/cancel", authenticate, validateCancelDelivery, deliveryController.cancelDelivery);
deliveryRouter.get("/:bookingId/status", authenticate, deliveryController.getStatus);