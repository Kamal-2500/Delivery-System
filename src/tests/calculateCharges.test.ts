import request from "supertest";
import app from "../app";

describe("Calculate Charges Tests", () => {
    it("should return 200 with charges details and delivery id", async () => {

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

        const response = await request(app)
            .post("/api/deliveries/calculate-charges")
            .set("Authorization", `Bearer ${token}`)
            .send(data);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.deliveryId).toBeDefined();
        expect(response.body.charges).toBeDefined();
    });

    it("should return 401 if token is not provided or invalid", async () => {
        const response = await request(app)
            .post("/api/deliveries/calculate-charges")
            .send({ });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Invalid token");
    });
    
    it("should return 400 if missing required fields", async () => {
        const loginResposne = await request(app)
            .post("/api/auth/login")
            .send({ email: "kamal@gmail.com", password: "Password@1" });

        const response = await request(app)
            .post("/api/deliveries/calculate-charges")
            .set("Authorization", `Bearer ${loginResposne.body.token}`)
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Pickup location is required");
    });

    it("should return 400 if not provide any package", async () => {
        const loginResposne = await request(app)
            .post("/api/auth/login")
            .send({ email: "kamal@gmail.com", password: "Password@1" });

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
            "packages": []
        }

        const response = await request(app)
            .post("/api/deliveries/calculate-charges")
            .set("Authorization", `Bearer ${loginResposne.body.token}`)
            .send(data);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("At least one package is required");
    });
});