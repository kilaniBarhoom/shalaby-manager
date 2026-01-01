import { Schema, model } from 'mongoose';

const expenseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Status must have a status'],
        maxlength: [100, 'Status cannot exceed 100 characters']
    },
    description: {
        type: String,
        maxlength: [400, 'Status cannot exceed 100 characters']
    },
    amount: {
        type: Number,
        required: [true, 'Status must have an amount'],
    },
    date: {
        type: Date,
        required: [true, 'Status must have a date'],
    },

}, { timestamps: true })

expenseSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    },
});



const Expense = model('Expense', expenseSchema)
export default Expense
