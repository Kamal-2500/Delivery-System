export interface User {
    id?: number;
    email: string;
    name: string;
    password: string;
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
}