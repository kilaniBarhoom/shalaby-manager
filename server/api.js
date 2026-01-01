import express from "express";
import { NOT_FOUND, OK } from "./constants/status.constants.js";
const router = express.Router();

//Cookie pasrser

// Routes and Authorizations
import expenseRoutes from "./routes/expense.route.js";
import paymentRoutes from "./routes/payment.route.js";


//	Routes

//  Health Check route, used for monitoring
router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});



// Posts routes
router.use("/expenses", expenseRoutes)

//payment Routes
router.use("/payments", paymentRoutes);


//  Undefined Routes
router.route("*").all((req, res) => {
    return res.status(NOT_FOUND).json({
        success: false,
        message: "Oops, you have reached an undefined route, please check your request and try again",
    });
});

export default router;