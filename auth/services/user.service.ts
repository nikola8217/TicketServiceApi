import { Request } from 'express';
import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { CreateUser, BuyTicket } from '../interfaces/user.interface';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

export class UserService {

    static async registerUser(req: Request) {

        const existingUser = await UserRepository.findByEmail(req.body.email);

        if (existingUser) {
            throw new BadRequestError('Email is taken');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData: CreateUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }

        const user = await UserRepository.createUser(userData);
        return user;
    }

    static async loginUser(req: Request) {

        const existingUser = await UserRepository.findByEmail(req.body.email);

        if (!existingUser) {
            throw new BadRequestError('Invalid credentionals');
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, existingUser.password);

        if (!isPasswordValid) {
            throw new BadRequestError('Invalid credentials');
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error('JWT must be defined');
        }

        const userJwt = jwt.sign({
            id: existingUser._id,
            email: existingUser.email
        }, secret);

        req.session = {
            id: existingUser._id,
            jwt: userJwt
        };

        return existingUser;

    }

    static async buyTicket(data: any) {

        let id = data.user;

        const ticket: BuyTicket = {
            concert: data.concert,
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            totalPrice: data.totalPrice
        };

        const user = await UserRepository.updateTickets(id, ticket);

        return user;

    }
}