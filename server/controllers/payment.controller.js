// create payments controllers
import * as statusCodes from '../constants/status.constants.js';

import Payment from '../models/payment.js';
import { PaymentSchema } from '../schemas/index.js';
import ResponseError from '../utils/respErr.js';

export const getAllPayments = async (req, res, next) => {

    const payments = await Payment.find();
    return res.status(statusCodes.OK).json({
        success: true,
        data: {
            payments,
            count: payments.length,
        },
    });
}

export const createPayment = async (req, res, next) => {
    const { date: oldDate } = req.body;
    const isValidationError = PaymentSchema.safeParse({
        ...req.body,
        date: new Date(oldDate)
    });
    if (!isValidationError.success) {
        return next(new ResponseError(
            isValidationError.error.errors[0].message
            , statusCodes.BAD_REQUEST));
    }

    let { date, amount, note } = req.body;

    const payment = await Payment.create({
        date: new Date(date),
        amount,
        note,
    });

    res.status(statusCodes.CREATED).json({
        status: 'success',
        message: 'Payment created successfully',
        data: payment,
    });
}

export const editPayment = async (req, res, next) => {
    const { paymentId } = req.params;
    const { date: oldDate } = req.body;
    const isValidationError = PaymentSchema.safeParse({
        ...req.body,
        date: new Date(oldDate)
    });
    if (!isValidationError.success) {
        return next(new ResponseError(
            isValidationError.error.errors[0].message
            , statusCodes.BAD_REQUEST));
    }



    const payment = await Payment.findByIdAndUpdate(paymentId, {
        ...req.body,
        date: new Date(req.body.date)
    }, { new: true, runValidators: true });

    res.status(statusCodes.OK).json({
        status: 'success',
        message: 'Payment updated successfully',
        data: payment,
    });
}

export const deletePayment = async (req, res, next) => {
    const { paymentId } = req.params;

    const payment = await Payment
        .findByIdAndDelete(paymentId);

    if (!payment) {
        return next(new ResponseError('Payment not found', statusCodes.NOT_FOUND));
    }

    res.status(statusCodes.OK).json({
        status: 'success',
        message: 'Payment deleted successfully',
    });
}

export const getSinglePayment = async (req, res, next) => {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);

    if (!payment) {
        return next(new ResponseError('Payment not found', statusCodes.NOT_FOUND));
    }

    res.status(statusCodes.OK).json({
        status: 'success',
        data: payment,
    });
}