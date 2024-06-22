import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    
    static async register(req: Request, res: Response, next: NextFunction) {

        try {
            const user = await UserService.registerUser(req);
            res.status(201).json(user);
        } catch (error) {
            return next(error); 
        }

    }

    static async login(req: Request, res: Response, next: NextFunction) {

        try {
            const user = await UserService.loginUser(req);
            res.status(200).json(user)
        } catch (error) {
            return next(error);
        }

    }

    static async logout(req: Request, res: Response) {
        req.session = null;

        res.send({});
    }

}