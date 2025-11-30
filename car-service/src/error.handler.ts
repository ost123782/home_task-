import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { NotFoundError } from "./errors/car.errors";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) return next(err);

    if (err.name === "MongoServerError" && (err as any).code === 11000) {
        return res.status(400).send({
            errors: [{ message: "Car with this unique field already exists" }],
        });
    }

    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({
            errors: Object.values(err.errors).map((e: any) => ({
                message: e.message,
            })),
        });
    }

    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({
            errors: [{ message: "Invalid ID format" }],
        });
    }

    if (err instanceof mongoose.Error) {
        return res.status(400).send({
            errors: [{ message: err.message }],
        });
    }

    if (err instanceof NotFoundError) {
        return res.status(err.statusCode).send({
            errors: [{ message: err.message }],
        });
    }

    console.error(err);
    return res.status(500).send({
        errors: [{ message: "Something went wrong" }],
    });
};