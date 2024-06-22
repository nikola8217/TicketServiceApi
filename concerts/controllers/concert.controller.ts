import { NextFunction, Request, Response } from "express";
import { ConcertService } from "../services/concert.service";
import { ConcertRepository } from '../repositories/concert.repository';
import { Producer } from '../events/publisher';
import { BadRequestError } from "../errors/bad-request-error";
import { BuyTicket } from '../interfaces/concert.interface';

export class ConcertController {

    static async createConcert(req: Request, res: Response, next: NextFunction) {

        try {
            const concert = await ConcertService.createConcert(req);
            res.status(201).json(concert);
        } catch (error) {
            return next(error);
        }

    }

    static async getAllConcerts(req: Request, res: Response) {

        const concerts = await ConcertRepository.getAllConcerts();
        res.status(200).json(concerts);
        
    }

    static async getSingleConcert(req: Request, res: Response, next: NextFunction) {
        
        try {
            const concert = await ConcertService.getSingleConcert(req);
            res.status(200).json(concert);
        } catch (error) {
            return next(error);
        }

    }

    static async buyTicket(req: Request, res: Response, next: NextFunction) {

        try {
            await ConcertService.buyTicket(req);
            res.status(200).json({'msg': 'Ticket bought!'});
        } catch (error) {
            next(error);
        }

    }

}