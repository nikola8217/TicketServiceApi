import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.session?.jwt;

    if (!token) {
        throw new NotAuthorizedError();
    }

    next();
}