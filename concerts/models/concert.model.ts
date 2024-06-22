import mongoose from 'mongoose';

interface Concert extends mongoose.Document {
    name: string,
    price: number
}

const concertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Concert = mongoose.model<Concert>('Concert', concertSchema);

export { Concert };