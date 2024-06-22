import mongoose from "mongoose";

interface User extends mongoose.Document {
    name: string
    email: string,
    password: string,
    tickets: {
        id: string;
        name: string;
        price: number;
        quantity: number;
        totalPrice: number;
    }[];
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tickets: {
        type: [{
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            totalPrice: {
                type: Number,
                required: true
            }
        }],
        default: [] 
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password
        }
    }
});

const User = mongoose.model<User>('User', userSchema);

export { User };