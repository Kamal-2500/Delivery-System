import { DeliveryStatus } from "../types";

export interface Delivery {
    id?: number;
    user_id: number;
    pickupLocationId: number;
    dropLocationId: number;
    status: DeliveryStatus;
    distance: number;
    charges: number;
    createdAt?: Date;
    updatedAt?: Date;
}