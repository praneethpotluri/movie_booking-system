// src/middlewares/validate.ts
import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validate = (schema: AnyZodObject) => 
    (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            next(error);
        }
    };

export default validate;