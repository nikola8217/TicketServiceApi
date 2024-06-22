import { User } from '../models/user.model';
import { BuyTicket, CreateUser } from '../interfaces/user.interface';

export class UserRepository {
    static async createUser(user: CreateUser) {
        return await User.create(user);
    }

    static async findByEmail(email: string) {
        return await User.findOne({ email });
    }

    static async updateTickets(id: string, ticket: BuyTicket) {
        return await User.findByIdAndUpdate(
            id,
            { $push: { tickets: ticket } },
            { new: true }
        );
    }
}