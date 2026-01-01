import express from "express";
import { OK } from '../constants/status.constants.js';
import * as controller from '../controllers/payment.controller.js';
import catcher from '../middleware/catcher.middleware.js';

const router = express.Router()

router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});


router.route('/')
    .get(catcher(controller.getAllPayments))
    .post(catcher(controller.createPayment))


router.route('/:paymentId')
    .get(catcher(controller.getSinglePayment))
    .delete(catcher(controller.deletePayment))
    .put(catcher(controller.editPayment))




export default router