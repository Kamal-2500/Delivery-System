import { QueryResult } from "mysql2";
import { User } from "../models";
import { BaseResponse, LoginResponse } from "../types";
import { ConflictError, JWTUtils, pool, UnauthorizedError } from "../utils";
import bcrypt from "bcrypt";
import { configs } from "../configs";

export class AuthService {

    public async register(user: User): Promise<BaseResponse> {
        const connection = await pool.getConnection();
        try {
            const [result]: any = await connection.execute(
                'SELECT id FROM users WHERE email = ?',
                [user.email]
            );

            if (result.length > 0) {
                throw new ConflictError("User already exists");
            }

            const passwordHash = await bcrypt.hash(user.password, 10);

            const res = await connection.execute(
                "INSERT INTO users (email, phone, name, password_hash) VALUES (?, ?, ?, ?)",
                [user.email, user.phone, user.name, passwordHash]
            );

            return { success: true };
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }
    public async login(email: string, password: string): Promise<LoginResponse> {
        const connection = await pool.getConnection();
        try {
            const [rows]: any = await connection.execute(
                'SELECT id, email, password_hash FROM users WHERE email = ?',
                [email]
            );

            if (rows.length === 0) {
                throw new UnauthorizedError("Invalid credentials");
            }

            const user = rows[0];
            const validPassword = await bcrypt.compare(password, user.password_hash);

            if (!validPassword) {
                throw new UnauthorizedError("Invalid credentials");
            }

            const token = JWTUtils.generateToken({ id: user.id, email: user.email });

            return {
                success: true,
                token,
                expiresIn: configs.jwt.expiresIn,
                type: "Bearer"
            };

        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }
}