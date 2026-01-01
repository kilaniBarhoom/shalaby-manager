import * as z from "zod";


export const ExpenseSchema = z.object({
    name: z.string().min(1, "Name must be at least 3 characters long").trim(),
    description: z.string().max(400, "Description could be at maximun 400 characters long").optional(),
    amount: z.number().min(1, "Amount must be at least 1"),
    date: z.date({
        required_error: "Date is required",
    }),
});


export const PaymentSchema = z.object({
    amount: z.number().min(0, "Advance payment must be at least 0"),
    date: z.date({
        required_error: "Date is required",
    }),
    note: z.string().optional(),
});
