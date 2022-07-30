const mongoose = require("mongoose")
const {
    Schema
} = mongoose;

const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        qty: {
            type: Number,
            default: 1
        },
    }]
}, {
    timestamps: {
        createdAt: "created_at"
    }
})

const CartItem = mongoose.model("CartItem", CartSchema)

module.exports = {
    CartItem
}