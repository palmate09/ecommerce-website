import {Router} from 'express'
import { userAuth } from '../middlewares/userAuth.js'
import { adminAuth } from '../middlewares/adminAuth.js'
import {  addRatings, addReply,  addReview, getAdminReviews,  getAllReplies, getAllReviews, getAllReviewsUser, getParticularReplies, getparticularReview, getRatings,  removeRatings, removeReply,  removeReview,  updateRatings, updateReply, updateReview } from '../controllers/reviewController.js';
const router = Router(); 


router.post('/users/:productId/addratings', userAuth, addRatings)
router.delete('/users/:productId/removeratings', userAuth, removeRatings)
router.put('/users/:productId/updateratings', userAuth, updateRatings)
router.get('/users/:productId/getratings', userAuth, getRatings)
router.post('/users/:productId/addreview', userAuth, addReview)
router.delete('/users/:productId/:reviewId', userAuth, removeReview)
router.put('/users/:productId/:reviewId', userAuth, updateReview)
router.get('/:productId', userAuth, getAllReviews)
router.get('/users/:productId', userAuth, getAllReviewsUser)
router.get('/users/:productId/:reviewId', userAuth, getparticularReview)
router.post('/users/:reviewId/addreply', userAuth, addReply)
router.get('/:reviewId/getAllreplies', userAuth, getAllReplies)
router.get('/users/:reviewId/:replyId/getParticularreply', userAuth, getParticularReplies)
router.delete('/users/:reviewId/:replyId/removeReply', userAuth, removeReply)
router.put('/users/:reviewId/:replyId/updateReply', userAuth, updateReply)
router.get('/admins/:productId', adminAuth, getAdminReviews)

export default router;
