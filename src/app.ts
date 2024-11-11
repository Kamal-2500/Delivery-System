import { deliveryRouter, authRouter } from "./routes";
import express from "express";
import cors from "cors";
import { errorHanlder } from "./middlewares";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/deliveries", deliveryRouter);

app.use(errorHanlder);

export default app;