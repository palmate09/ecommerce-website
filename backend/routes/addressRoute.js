import {Router} from 'express'
import { userAuth} from '../middlewares/userAuth.js'
import { addAddress, getAddress, getAllAddress, removeAddress, updateAddress } from '../controllers/addressContoller.js';
const router = Router(); 

router.post('/users/address/addAddress', userAuth, addAddress); 
router.delete('/users/address/deleteAddress/:addressId', userAuth, removeAddress); 
router.put('/users/address/updateAddress/:addressId', userAuth, updateAddress)
router.get('/users/getAllAddress', userAuth, getAllAddress); 
router.get('/users/address/getAddress/:addressId', userAuth, getAddress); 

export default router; 