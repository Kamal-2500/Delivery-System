export interface Location {
    id?: number;
    latitude: number;
    longitude: number;
    address: string;
    city?: string;
    state?: string;
    postalCode: string;
    createdAt?: Date;
    updatedAt?: Date;
}