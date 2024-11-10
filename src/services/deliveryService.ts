import { CalculateChargesResponse, DeliveryRequest } from "../types";
import { ChargeUtils, DistnaceUtils } from "../utils";
import { Location, Package } from "../models";

export class DelieryService {
    public async calculateCharges(pickupLocation: Location, dropLocation: Location, packages: Package[]): Promise<CalculateChargesResponse> {
        try {
            const distance = DistnaceUtils.calculateDistance(pickupLocation.latitude, pickupLocation.longitude, dropLocation.latitude, dropLocation.longitude);
            const charges = ChargeUtils.calculateCharges(distance, packages);
            return {
                success: true,
                charges   
            }
        } catch (error) {
            throw error;
        }
    }

    public async bookDelivery(userId: number, deliveryRequest: DeliveryRequest) {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    public async cancelDelivery(userId: number, deliveryId: number) {
        try {

        } catch (error) {
            throw error;
        }
    }
}