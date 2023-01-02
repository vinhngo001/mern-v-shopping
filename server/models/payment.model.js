const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    payment_id: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Payments", PaymentSchema);