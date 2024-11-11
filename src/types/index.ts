import { Location, Package } from "../models";

export type NonNullableProps<T> = {
    [K in keyof T]: NonNullable<T[K]>
}

export enum DeliveryStatus {
    PENDING = "PENDING",
    BOOKED = "BOOKED",
    CONFIRMED = "CONFIRMED",
    PICKED_UP = "PICKED_UP",
    IN_TRANSIT = "IN_TRANSIT",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}

export enum PackageType {
    ELECTRONICS = "ELECTRONICS",
    FURNITURE = "FURNITURE",
    FRAGILE = "FRAGILE",
    PERISHABLE = "PERISHABLE",
    DOCUMENT = "DOCUMENT",
    OTHER = "OTHER"
}

export interface PackageCharge {
    packageIndex: number;
    weightCharge: number;
    volumeCharge: number;
    productTypeCharge: number;
    subtotal: number;
}

export interface ChargesCalculation {
    baseCharge: number;
    distanceCharge: number;
    weightCharge: number;
    productTypeCharge: number;
    totalCharge: number;
    breakdown: {
        packageCharges: PackageCharge[];
        totalDistance: number; // in km
    };
}

export interface BaseResponse {
    success: boolean;
    message?: string;
}

export interface DeliveryRequest {
    pickupLocation: Location;
    dropLocation: Location;
    packages: Package[];
}

export interface LoginResponse extends BaseResponse {
    token: string;
    expiresIn: number;
    type: "Bearer"
}

export interface CalculateChargesResponse extends BaseResponse {
    deliveryId: string;
    charges: ChargesCalculation
}

export interface BookDeliveryResponse extends BaseResponse {
    deliveryId: string;
    bookingId: string;
}