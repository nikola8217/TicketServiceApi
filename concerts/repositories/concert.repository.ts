import { CreateConcert } from "../interfaces/concert.interface";
import { Concert } from "../models/concert.model";

export class ConcertRepository {

    static async createConcert(concert: CreateConcert) {

        return await Concert.create(concert);

    }

    static async findByName(name: string) {

        return await Concert.findOne({ name });

    }

    static async getAllConcerts() {

        return await Concert.find({});

    }

    static async getConcertById(id: string) {

        return await Concert.findById(id);

    }
}