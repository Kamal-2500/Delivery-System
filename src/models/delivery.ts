import { DeliveryStatus } from "../types";

export interface Delivery {
    id?: string;
    userId: number;
    pickupLocationId: number;
    dropLocationId: number;
    status: DeliveryStatus;
    distance: number;
    charges: number;
    bookingId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}