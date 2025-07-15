import { Router } from "express";
import { userAuth } from '../middlewares/userAuth.js'
import { getparticularPayment, getpayment, payment } from "../controllers/paymentContorller.js";
const router = Router(); 


router.post('/users/checkout/payment', userAuth, payment ); 
router.get('/users/checkout/payment/:paymentId', userAuth, getparticularPayment)
router.get('/users/checkout/payment', userAuth, getpayment)

export default router; 