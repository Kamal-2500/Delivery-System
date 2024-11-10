import { PackageType } from "../types";

export interface Package {
    id?: number;
    deliveryId: number;
    weight: number; // in kg
    length: number; // in cm
    width: number; // in cm
    height: number; // in cm
    type: PackageType;
    amount?: number;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}