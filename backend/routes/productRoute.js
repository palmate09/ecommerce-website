import {Router} from 'express'; 
import {adminAuth} from '../middlewares/adminAuth.js'
import {userAuth} from '../middlewares/userAuth.js'
import { addCategory, addProducts, deleteCategory, deleteProducts, getAdminProducts, getProducts, updateCategory, updateProducts } from '../controllers/productContoller.js';
const router = Router(); 


router.post('/admin/category/addCategory', adminAuth, addCategory); 
router.delete('/admin/category/:categoryName', adminAuth, deleteCategory); 
router.put('/admin/category/:categoryName', adminAuth, updateCategory); 
router.post('/admin/prodcuts/:categoryName', adminAuth, addProducts); 
router.get('/users/prodcuts/:categoryName', userAuth, getProducts)
router.get('/admin/prodcuts/:categoryName', adminAuth, getAdminProducts); 
router.put('/admin/prodcuts/:categoryName/:productId', adminAuth, updateProducts); 
router.delete('/admin/prodcuts/:categoryName/:productId', adminAuth, deleteProducts)

export default router; 