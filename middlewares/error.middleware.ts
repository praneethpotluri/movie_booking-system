import { Request, Response, NextFunction } from "express";
import { getSystemErrorMessage } from "util";
import { ZodError } from "zod";

export const globalErrorHandler = (
    err: unknown, 
    req: Request, 
    res: Response,
    next: NextFunction) => {
        // Default Response
        let statusCode = 500;
        let message = "Internal Server Error";
        let error: {
            field?: string;
            message: string;
        }[] = [];
        

        // Zod error handling
        if (err instanceof ZodError) {
            statusCode = 400;
            message = "Bad Request";
            error = err.errors.map(e => ({
                field: e.path.join('.'),
                message: e.message
            }));
        } else if (err instanceof Error) {
            message = err.message;

        }
        res.status(statusCode).json({
            success: false,
            message,
            error
        });
    }