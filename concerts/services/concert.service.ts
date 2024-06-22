import { Request } from "express";
import { CreateConcert } from "../interfaces/concert.interface";
import { ConcertRepository } from "../repositories/concert.repository";
import { BadRequestError } from "../errors/bad-request-error";
import { BuyTicket } from '../interfaces/concert.interface';
import { Producer } from '../events/publisher';


export class ConcertService {

    static async createConcert(req: Request) {

        const existingConcert = await ConcertRepository.findByName(req.body.name);

        if (existingConcert) {
            throw new BadRequestError('Concert already exists');
        }

        const concertData: CreateConcert = {
            name: req.body.name,
            price: req.body.price
        };

        const concert = await ConcertRepository.createConcert(concertData);

        return concert;
    }

    static async getSingleConcert(req: Request) {

        const concert = await ConcertRepository.getConcertById(req.params.id);

        return concert;
    }

    static async buyTicket(req: Request) {

        const concert = await ConcertRepository.getConcertById(req.params.id);

        if (!concert) {
            throw new BadRequestError('Concert does not exist!');
        }

        const data: BuyTicket = {
            user: req.session?.id,
            concert: req.params.id,
            name: concert.name,
            price: concert.price,
            quantity: req.body.quantity,
            totalPrice: concert.price * req.body.quantity
        };

        await Producer.produceMessage(JSON.stringify(data));

    }

}