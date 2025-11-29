import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) return next(err);

    // Duplicate key error (наприклад, email вже існує)
    if (err instanceof mongoose.Error && (err as any).code === 11000) {
        return res.status(400).send({
            errors: [{ message: "User with this email already exists" }],
        });
    }

    // Validation errors (required, minlength, enum і т.д.)
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({
            errors: Object.values(err.errors).map((e: any) => ({
                message: e.message,
            })),
        });
    }

    // CastError — наприклад, неправильний ObjectId
    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({
            errors: [{ message: "Invalid ID format" }],
        });
    }

    // Інші Mongoose помилки
    if (err instanceof mongoose.Error) {
        return res.status(400).send({
            errors: [{ message: err.message }],
        });
    }

    // Unknown error
    return res.status(500).send({
        errors: [{ message: "Something went wrong" }],
    });
};
