import {Router} from 'express'
import { AdminForgotPassword, AdminforgotPasswordReq, AdminLogin, AdminProfile, Adminsignup, getAllUsers, getParticularUser, updateAdminProfile } from '../controllers/adminContoller.js';
import { LoginLimiter } from '../middlewares/rateLimiter.js'
import { adminAuth } from '../middlewares/adminAuth.js'
const router = Router(); 


router.post('/admins/signup', Adminsignup)
router.post('/admins/login', LoginLimiter, AdminLogin)
router.get('/admins/profile', adminAuth, AdminProfile )
router.put('/admins/profile', adminAuth, updateAdminProfile)
router.post('/admins/forgot_password', AdminforgotPasswordReq)
router.post('/admins/forgot_password/:token', AdminForgotPassword)
router.get('/admins/getAllusers', adminAuth, getAllUsers)
router.get('/admins/getParticularUser', adminAuth, getParticularUser)


export default router; 