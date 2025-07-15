import { Router } from "express";
import { userAuth } from '../middlewares/userAuth.js'
import { adminAuth } from "../middlewares/adminAuth.js";
import { deleteOrder, deleteOrders, getOrder, getParticularOrder, updateOrderStatus } from "../controllers/orderController.js";
const router = Router(); 


router.get('/myOrders/getallOrders', userAuth, getOrder)
router.get('/myOrder/:orderId', userAuth, getParticularOrder)
router.delete('/users/myOrders', userAuth, deleteOrders)
router.delete('/users/myOrders/:orderId', userAuth, deleteOrder); 
router.put('/admins/adminOrders/:orderId', adminAuth, updateOrderStatus); 

export default router; 
