import mongoose from "mongoose";

/*SCHEMA FOR PRODUCT MODEL*/
const Product = mongoose.model("Products",
    {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        new_price: {
            type: Number,
            required: true
        },
        old_price: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        available: {
            type: Boolean,
            default: true
        }
    }
)

export const Users = mongoose.model('Users',
    {
        name: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        cartData: {
            type: Object
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)


export default Product;