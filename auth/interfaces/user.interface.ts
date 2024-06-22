export interface CreateUser {
    name: string,
    email: string,
    password: string
};

export interface BuyTicket {
    concert: String,
    name: String,
    price: Number,
    quantity: Number,
    totalPrice: Number
}