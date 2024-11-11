import { BaseResponse, BookDeliveryResponse, CalculateChargesResponse } from "../types";
import { BadRequestError, ChargeUtils, DistnaceUtils, NotFoundError, DBUtils } from "../utils";
import { Location, Package } from "../models";
import { randomUUID } from "crypto";

export class DelieryService {
    /**
     * Calculates the delivery charges and stores delivery details in the database.
     * @param userId The Id of the user.
     * @param pickupLocation The location from where the package will be picked up.
     * @param dropLocation The location where the package will be delivered.
     * @param packages An array of packages to be delivered.
     * @returns A promise that resolves to a CalculateChargesResponse object containing the delivery ID and calculated charges.
     */
    public async calculateCharges(userId: number, pickupLocation: Location, dropLocation: Location, packages: Package[]): Promise<CalculateChargesResponse> {
        const connection = await DBUtils.getPool().getConnection();
        try {
            const distance = DistnaceUtils.calculateDistance(pickupLocation.latitude, pickupLocation.longitude, dropLocation.latitude, dropLocation.longitude);
            const charges = ChargeUtils.calculateCharges(distance, packages);

            await connection.beginTransaction();

            const [pickupResult]: any = await connection.execute(
                `INSERT INTO locations 
                (latitude, longitude, address, city, state, postal_code)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    pickupLocation.latitude,
                    pickupLocation.longitude,
                    pickupLocation.address,
                    pickupLocation.city || null,
                    pickupLocation.state || null,
                    pickupLocation.postalCode
                ]
            );

            const pickupId = pickupResult.insertId;

            const [dropResult]: any = await connection.execute(
                `INSERT INTO locations 
                (latitude, longitude, address, city, state, postal_code)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    dropLocation.latitude,
                    dropLocation.longitude,
                    dropLocation.address,
                    dropLocation.city || null,
                    dropLocation.state || null,
                    dropLocation.postalCode
                ]
            );

            const dropId = dropResult.insertId;

            const deliveryId = randomUUID();

            await connection.execute(
                `INSERT INTO deliveries 
                (id, user_id, pickup_location_id, drop_location_id, status, distance, charges)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    deliveryId,
                    userId,
                    pickupId,
                    dropId,
                    "PENDING",
                    charges.breakdown.totalDistance,
                    charges.totalCharge
                ]
            );


            for (const pkg of packages) {
                const [pkgResult]: any = await connection.execute(
                    `INSERT INTO packages 
                  (delivery_id, weight, length, width, height, type, amount, description)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        deliveryId,
                        pkg.weight,
                        pkg.length,
                        pkg.width,
                        pkg.height,
                        pkg.type,
                        pkg.amount || null,
                        pkg.description || null
                    ]
                );
            }

            await connection.commit();

            return {
                success: true,
                deliveryId,
                charges
            }
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    /**
     * Books a delivery for a user if it is in a pending state and updates its status to booked.
     * @param userId The Id of the user.
     * @param deliveryId The Id of the delivery to be booked.
     * @returns A promise that resolves to a BookDeliveryResponse object containing the delivery Id and booking Id.
     */
    public async bookDelivery(userId: number, deliveryId: string): Promise<BookDeliveryResponse> {
        const connection = await DBUtils.getPool().getConnection();
        try {

            const [deliveryResult]: any = await connection.execute(
                "SELECT * FROM deliveries WHERE user_id = ? AND id = ?", [userId, deliveryId]
            );

            if (deliveryResult.length === 0) {
                throw new NotFoundError("Delivery not found");
            }

            const delivery = deliveryResult[0];

            if (delivery.booking_id) {
                throw new BadRequestError("Delivery is not eligible for booking");
            }

            if (delivery.status !== "PENDING") {
                throw new BadRequestError("Delivery is not eligible for booking");
            }

            const bookingId = randomUUID();
            await connection.execute(
                "UPDATE deliveries SET booking_id = ?, status = ? WHERE id = ?",
                [bookingId, "BOOKED", deliveryId]
            );

            return {
                success: true,
                deliveryId,
                bookingId
            }
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }

    /**
     * Cancels a delivery for a user if it is in a booked or confirmed state and updates its status to cancelled.
     * @param userId The Id of the user.
     * @param bookingId The booking Id of the delivery to be cancelled.
     * @returns A promise that resolves to a BaseResponse object containing a success flag.
     */
    public async cancelDelivery(userId: number, bookingId: number): Promise<BaseResponse> {
        const connection = await DBUtils.getPool().getConnection();
        try {
            const [deliveryResult]: any = await connection.execute(
                "SELECT * FROM deliveries WHERE user_id = ? AND booking_id = ?", [userId, bookingId]
            );

            if (deliveryResult.length === 0) {
                throw new NotFoundError("Delivery not found");
            }

            const delivery = deliveryResult[0];

            if (delivery.status !== "BOOKED" && delivery.status !== "CONFIRMED") {
                throw new BadRequestError("Delivery is not eligible for cancellation");
            }

            await connection.execute(
                "UPDATE deliveries SET status = ? WHERE id = ?",
                ["CANCELLED", delivery.id]
            );

            return { success: true };
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }

    /**
     * Retrieves the status of a delivery.
     * @param userId The Id of the user.
     * @param bookingId The booking Id of the delivery.
     * @returns A promise that resolves to a BaseResponse object containing a success flag and the status of the delivery.
     */
    public async getStatus(userId: number, bookingId: string): Promise<BaseResponse & {status: string}> {
        const connection = await DBUtils.getPool().getConnection();
        try {
            const [deliveryResult]: any = await connection.execute(
                "SELECT * FROM deliveries WHERE user_id = ? AND booking_id = ?", [userId, bookingId]
            );

            if (deliveryResult.length === 0) {
                throw new NotFoundError("Booking not found");
            }

            const delivery = deliveryResult[0];

            return { success: true, status: delivery.status };

        } catch (error) {
            throw error;
        }
    }
}