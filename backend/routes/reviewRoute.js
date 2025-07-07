import {Router} from 'express'
import { userAuth } from '../middlewares/userAuth.js'
import { adminAuth } from '../middlewares/adminAuth.js'
import { addlike, addRatings, addReply, addreplylike, addReview, getAdminReviews, getAllLIkes, getAllReplies, getAllReviews, getAllReviewsUser, getlikes, getParticularReplies, getparticularReview, getRatings, removelike, removeRatings, removeReply, removereplyLike, removeReview, updateLike, updateRatings, updateReply, updatereplylike, updateReview } from '../controllers/reviewController.js';
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
router.get('/users/:reviewId', userAuth, getAllReplies)
router.get('/users/:reviewId/:replyId', userAuth, getParticularReplies)
router.post('/users/:reviewId', userAuth, addReply)
router.delete('/users/:reviewId/:replyId', userAuth, removeReply)
router.put('/users/:reviewId/:replyId', userAuth, updateReply)
router.post('/users/:reviewId', userAuth, addlike)
router.put('/users/:reviewId/:likeId', userAuth, updateLike)
router.delete('/users/:reviewId/:likeId', userAuth, removelike)
router.get('/users/:reviewId', userAuth, getAllLIkes)
router.get('/users/:replyId', userAuth, getlikes)
router.post('/users/:replyId', userAuth, addreplylike)
router.put('/users/:replyId/:likeId', userAuth, updatereplylike)
router.delete('/users/:replyId/:likeId', userAuth, removereplyLike)
router.get('/users/:productId', adminAuth, getAdminReviews)

export default router; 
