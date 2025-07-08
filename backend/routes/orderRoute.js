import { Router } from "express";
import { userAuth } from '../middlewares/userAuth.js'
import { adminAuth } from "../middlewares/adminAuth.js";
import { deleteOrder, deleteOrders, getAdminOrder, getAdminOrders, getOrder, getParticularOrder, updateOrderStatus } from "../controllers/orderController";
const router = Router(); 


router.get('/users/myOrders', userAuth, getOrder)
router.get('/users/myOrders/:orderId', userAuth, getParticularOrder)
router.delete('/users/myOrders', userAuth, deleteOrders)
router.delete('/users/myOrders/:orderId', userAuth, deleteOrder); 
router.get('/users/adminOrders', adminAuth , getAdminOrders);
router.get('/users/adminOrders/:orderId', adminAuth, getAdminOrder);
router.put('/users/adminOrders/:orderId', adminAuth, updateOrderStatus); 

export default router; 
