import request from "supertest";
import app from "../app";

describe("Cancel Delivery Tests", () => {
    it("should return 200", async () => {
        const loginResposne = await request(app)
            .post("/api/auth/login")
            .send({ email: "kamal@gmail.com", password: "Password@1" });

        const token = loginResposne.body.token;

        const data = {
            "pickupLocation": {
                "latitude": 23.07390,
                "longitude": 72.56913,
                "address": "Abhishek Appartment",
                "postalCode": "380013"
            },
            "dropLocation": {
                "latitude": 23.05079,
                "longitude": 72.59596,
                "address": "July Apartment",
                "postalCode": "380004"
            },
            "packages": [
                {
                    "weight": 5,
                    "height": 30,
                    "width": 30,
                    "length": 30,
                    "type": "ELECTRONICS"
                }
            ]
        };

        const calculateChargesResponse = await request(app)
            .post("/api/deliveries/calculate-charges")
            .set("Authorization", `Bearer ${token}`)
            .send(data);

        const deliveryId = calculateChargesResponse.body.deliveryId;

        const bookDeliveryResponse = await request(app)
        .post("/api/deliveries/book")
        .set("Authorization", `Bearer ${token}`)
        .send({deliveryId});

        const bookingId = bookDeliveryResponse.body.bookingId;

        const cancelDeliveryResponse = await request(app)
        .post("/api/deliveries/cancel")
        .set("Authorization", `Bearer ${token}`)
        .send({bookingId});

        expect(cancelDeliveryResponse.status).toBe(200);
        expect(cancelDeliveryResponse.body.success).toBe(true);
    });

    it("should return 401 if token is not provided or invalid", async () => {
        const response = await request(app)
            .post("/api/deliveries/cancel")
            .send({});

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Invalid token");
    });

    it("should return 400 if not provide booking id", async () => {
        const loginResposne = await request(app)
            .post("/api/auth/login")
            .send({ email: "kamal@gmail.com", password: "Password@1" });

        const response = await request(app)
            .post("/api/deliveries/cancel")
            .set("Authorization", `Bearer ${loginResposne.body.token}`)
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Booking id is required");
    });

    it("should return 404 if delivery is not found", async () => {
        const loginResposne = await request(app)
            .post("/api/auth/login")
            .send({ email: "kamal@gmail.com", password: "Password@1" });

        const response = await request(app)
            .post("/api/deliveries/cancel")
            .set("Authorization", `Bearer ${loginResposne.body.token}`)
            .send({ bookingId: "a4e1a9bf-3d28-4a97-a6b0-f7c0764171b9" });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Delivery not found");
    });
});