import * as statusCodes from '../constants/status.constants.js';

import Expense from '../models/expense.js';
import { ExpenseSchema } from '../schemas/index.js';
import ResponseError from '../utils/respErr.js';

// create a new expense, edit a expense, delete a expense, get all expenses, get a single expense, delete a expense after 1 day
export const getAllExpenses = async (req, res, next) => {


    const expenses = await Expense.find();

    return res.status(statusCodes.OK).json({
        success: true,
        data: {
            expenses,
            count: expenses.length,
        },
    });
}

export const createExpense = async (req, res, next) => {

    const { date: oldDate } = req.body;


    const isValidationError = ExpenseSchema.safeParse({ ...req.body, date: new Date(oldDate) });

    if (!isValidationError.success) {
        return next(new ResponseError(
            isValidationError.error.errors[0].message
            , statusCodes.BAD_REQUEST));
    }

    const { date, name, description, amount } = req.body;

    await Expense.create({
        name,
        description,
        amount,
        date: new Date(date).setUTCHours(0, 0, 0, 0),
    });
    res.status(statusCodes.CREATED).json({
        status: 'success',
        message: 'Expense created successfully',
    });
}

export const editExpense = async (req, res, next) => {

    const { date: oldDate } = req.body;

    const isValidationError = ExpenseSchema.safeParse(
        { ...req.body, date: new Date(oldDate) }
    );
    if (!isValidationError.success) {
        return next(new ResponseError(
            isValidationError.error.errors[0].message
            , statusCodes.BAD_REQUEST));
    }

    const { name, description, amount, date } = req.body

    if (!isValidationError.success) {
        return next(new ResponseError(
            isValidationError.error.errors[0].message
            , statusCodes.BAD_REQUEST));
    }


    const expense = await Expense.findByIdAndUpdate(req.params.expenseId, {
        name,
        description,
        amount,
        date: new Date(date).setUTCHours(0, 0, 0, 0),
    }, { new: true, runValidators: true, strict: false });

    if (!expense) {
        return next(new ResponseError('Expense not found', statusCodes.NOT_FOUND));
    }

    res.status(statusCodes.OK).json({
        status: 'success',
        message: 'Expense updated successfully',
    });
}

export const deleteExpense = async (req, res, next) => {
    await Expense.findByIdAndDelete(req.params.expenseId);
    res.status(statusCodes.OK).json({
        status: true,
        message: 'Expense deleted successfully',
    });
}


export const getSingleExpense = async (req, res, next) => {
    const expense = await Expense.findById(req.params.expenseId)

    if (!expense) {
        return next(new ResponseError('Expense not found', statusCodes.NOT_FOUND));
    }
    res.status(statusCodes.OK).json({
        status: 'success',
        data: expense,
    });
}
