import {Router} from 'express'; 
import {adminAuth} from '../middlewares/adminAuth.js'
import {userAuth} from '../middlewares/userAuth.js'
import { addCategory, addProducts, deleteCategory, deleteProducts, getAdminProducts, getProducts, updateCategory, updateProducts } from '../controllers/productContoller.js';
const router = Router(); 


router.post('/admin/category/addCategory', adminAuth, addCategory); 
router.delete('/admin/category/:categoryName', adminAuth, deleteCategory); 
router.put('/admin/category/:categoryName', adminAuth, updateCategory); 
router.post('/admin/products/:categoryName', adminAuth, addProducts); 
router.get('/users/products/:categoryName', userAuth, getProducts)
router.get('/admin/products/:categoryName', adminAuth, getAdminProducts); 
router.put('/admin/products/:categoryName/:productId', adminAuth, updateProducts); 
router.delete('/admin/products/:categoryName/:productId', adminAuth, deleteProducts)

export default router; 