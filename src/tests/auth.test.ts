import request from "supertest";
import app from "../app";

describe("Login Tests", () => {
    it("should return 200 with JWT token", async () => {
        const loginData = { email: "kamal@gmail.com", password: "Password@1" };

        const response = await request(app)
            .post("/api/auth/login")
            .send(loginData);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
    });

    it("should return 400 if missing required fields", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Email is required");
    });

    it("should return 401 if credentials are invalid", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({ email: "dummy@gmail.com", password: "Password@1" });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Invalid credentials");
    });
});

describe("Register Tests", () => {
    it("should return 200", async () => {
        const data = { email: "kushal@gmail.com", password: "Password@1", phone: "0123456789", name: "Kushal" };

        const response = await request(app)
            .post("/api/auth/register")
            .send(data);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
    });

    it("should return 400 if missing required fields", async () => {
        const data = { password: "Password@1", phone: "0123456789", name: "Kushal" };

        const response = await request(app)
            .post("/api/auth/register")
            .send(data);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Email is required");
    });

    it("should return 400 if validation fails", async () => {
        const data = { email: "kushal@gmail.com", password: "Password@1", phone: "abcd", name: "Kushal" };

        const response = await request(app)
            .post("/api/auth/register")
            .send(data);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Phone must contain only digits");
    });

    it("should return 409 if user already exists", async () => {
        const data = { email: "kushal@gmail.com", password: "Password@1", phone: "0123456789", name: "Kushal" };
            
        const response = await request(app)
            .post("/api/auth/register")
            .send(data);

        expect(response.status).toBe(409);
        expect(response.body.message).toBe("User already exists");
    });
});