import { Router } from "express";
import { userAuth } from '../middlewares/userAuth.js'
import { GetAllPayments, getparticularPayment, payment } from "../controllers/paymentContorller.js";
const router = Router(); 


router.post('/users/checkout/payment', userAuth, payment ); 
router.get('/users/checkout/payment/:paymentId', userAuth, getparticularPayment)
router.get('/users/payment/history/getallpayments', userAuth, GetAllPayments)

export default router;