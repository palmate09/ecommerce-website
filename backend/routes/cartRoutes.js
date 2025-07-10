import {Router} from 'express'
import {userAuth} from '../middlewares/userAuth.js'
import { addCart, addItems, Decrementquantity, deleteCart, deleteItems, getCartData, Incrementquantity, updateItems } from '../controllers/cartController.js';
const router = Router(); 


router.post('/cart/addcart', userAuth, addCart)
router.get('/cart/getCartData', userAuth, getCartData)
router.delete('/cart/deletecart', userAuth, deleteCart)
router.post('/cart/item', userAuth, addItems)
router.put('/cart/item/:itemsId', userAuth, updateItems)
router.delete('/cart/item/:itemsId', userAuth, deleteItems)
router.patch('/cart/item/increment/:productId', userAuth, Incrementquantity)
router.patch('/cart/item/decrement/:productId', userAuth, Decrementquantity)

export default router; 