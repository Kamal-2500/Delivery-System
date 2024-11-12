import { NextFunction, Request, Response } from "express";
import { BaseResponse } from "../types";

export function errorHanlder(error: any, req: Request, res: Response, next: NextFunction) {
    // if (process.env.NODE_ENV = "development") {
    //     console.log(error);
    // }
    const resposne: BaseResponse = {
        success: false,
        message: "Internal Server Error"
    };

    if (error.statusCode) {
        resposne.message = error.message;
    }

    res.status(error.statusCode || 500).json(resposne);
}
