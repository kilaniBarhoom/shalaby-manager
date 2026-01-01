import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({
    date: {
        type: Date,
        required: [true, "Please provide a date"],
    },
    amount: {
        type: Number,
        default: 0,
        required: [true, "Please provide an amount"],
    },
    note: {
        type: String,
    },
})


paymentSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    },
});

const Payment = model('Payment', paymentSchema)
export default Payment
