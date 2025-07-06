import {Router} from 'express'
import { LoginLimiter } from '../middlewares/rateLimiter.js'
import { userAuth } from '../middlewares/userAuth.js'
import { forgotPassword, forgotPasswordReq, getProfile, login, signup, updateProfile } from '../controllers/userController.js';
const router = Router(); 


router.post('/users/signup', signup); 
router.post('/users/login', LoginLimiter, login); 
router.get('/users/profile', userAuth, getProfile)
router.put('/users/profile', userAuth, updateProfile); 
router.post('/users/forgot-password-req', forgotPasswordReq); 
router.post('/users/forgot-password/:token', forgotPassword)


export default router; 
