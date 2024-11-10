import express from "express";
import { DeliveryController } from "../controllers";
import { authenticate, validaeCalculateCharges } from "../middlewares";

export const deliveryRouter = express.Router();

const deliveryController = new DeliveryController();

deliveryRouter.post("/calculate-charges", authenticate, validaeCalculateCharges, deliveryController.calculateCharges);
deliveryRouter.post("/book", authenticate, deliveryController.bookDelivery);
deliveryRouter.post("/:deliveryId/cancel", deliveryController.cancelDelivery);
deliveryRouter.get("/my-deliveries");