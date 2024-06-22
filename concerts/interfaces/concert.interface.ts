export interface CreateConcert {
    name: string,
    price: number
};

export interface BuyTicket {
    user: String,
    concert: String,
    name: String,
    price: Number,
    quantity: Number,
    totalPrice: Number
}