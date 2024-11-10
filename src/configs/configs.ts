import dotenv from "dotenv";
import { NonNullableProps } from "../types";

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
})

type Env = {
    SERVER_HOST: string | undefined;
    SERVER_PORT: string | undefined;
    DB_HOST: string | undefined;
    DB_USER: string | undefined;
    DB_PASSWORD: string | undefined;
    DB_NAME: string | undefined;
    CHARGES_BASE_AMOUNT: string | undefined;
    CHARGES_PER_KM: string | undefined;
    CHARGES_PER_WEIGHT: string | undefined;
    CHARGES_PER_CUBIC: string | undefined;
    CHARGES_ON_ELECTRONICS: string | undefined;
    CHARGES_ON_FURNITURE: string | undefined;
    CHARGES_ON_FRAGILE: string | undefined;
    CHARGES_ON_PERISHABLE: string | undefined;
    CHARGES_ON_DOCUMENT: string | undefined;
    CHARGES_ON_OTHER: string | undefined;
    JWT_SECRET: string | undefined;
    JWT_EXPIRES_IN: string | undefined;
}

type SenitizedEnv = NonNullableProps<Env>;

const getEnv = (): Env => {
    return {
        SERVER_HOST: process.env.SERVER_HOST,
        SERVER_PORT: process.env.SERVER_PORT,
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        CHARGES_BASE_AMOUNT: process.env.CHARGES_BASE_AMOUNT,
        CHARGES_PER_KM: process.env.CHARGES_PER_KM,
        CHARGES_PER_WEIGHT: process.env.CHARGES_PER_WEIGHT,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
        CHARGES_PER_CUBIC: process.env.CHARGES_PER_CUBIC,
        CHARGES_ON_ELECTRONICS: process.env.CHARGES_ON_ELECTRONICS,
        CHARGES_ON_FURNITURE: process.env.CHARGES_ON_FURNITURE,
        CHARGES_ON_FRAGILE: process.env.CHARGES_ON_FRAGILE,
        CHARGES_ON_PERISHABLE: process.env.CHARGES_ON_PERISHABLE,
        CHARGES_ON_DOCUMENT: process.env.CHARGES_ON_DOCUMENT,
        CHARGES_ON_OTHER: process.env.CHARGES_ON_OTHER
    }
}

const getSenitizedEnv = (env: Env): SenitizedEnv => {
    for (const [key, value] of Object.entries(env)) {
        if (!value) {
            throw new Error(`Value of ${key} is null`);
        }
    }

    return env as SenitizedEnv;
}

interface IConfigs {
    server: {
        host: string;
        port: number;
    },
    db: {
        host: string;
        user: string;
        password: string;
        name: string;
    },
    charges: {
        baseAmount: number;
        perKM: number;
        perWeight: number;
        perCubic: number;
        onElectronics: number;
        onFurniture: number;
        onFragile: number;
        onPerishable: number;
        onDocument: number;
        onOther: number;
    },
    jwt: {
        secret: string;
        expiresIn: number;
    }
}

const senitizedEnv = getSenitizedEnv(getEnv());

export const configs: IConfigs = {
    server: {
        host: senitizedEnv.SERVER_HOST,
        port: Number(senitizedEnv.SERVER_PORT)
    },
    db: {
        host: senitizedEnv.DB_HOST,
        user: senitizedEnv.DB_USER,
        password: senitizedEnv.DB_PASSWORD,
        name: senitizedEnv.DB_NAME
    },
    charges: {
        baseAmount: Number(senitizedEnv.CHARGES_BASE_AMOUNT),
        perKM: Number(senitizedEnv.CHARGES_PER_KM),
        perWeight: Number(senitizedEnv.CHARGES_PER_WEIGHT),
        perCubic: Number(senitizedEnv.CHARGES_PER_CUBIC),
        onElectronics: Number(senitizedEnv.CHARGES_ON_ELECTRONICS),
        onFurniture: Number(senitizedEnv.CHARGES_ON_FURNITURE),
        onFragile: Number(senitizedEnv.CHARGES_ON_FRAGILE),
        onPerishable: Number(senitizedEnv.CHARGES_ON_PERISHABLE),
        onDocument: Number(senitizedEnv.CHARGES_ON_DOCUMENT),
        onOther: Number(senitizedEnv.CHARGES_ON_OTHER)
    },
    jwt: {
        secret: senitizedEnv.JWT_SECRET,
        expiresIn: Number(senitizedEnv.JWT_EXPIRES_IN)
    }
}