import {Router} from 'express'
import { replyLike, reviewLike } from '../controllers/likeController.js';
import { userAuth } from '../middlewares/userAuth.js'
const router = Router(); 


router.post('/review/:reviewId/vote', userAuth, reviewLike)
router.post('/reply/:replyId/vote', userAuth, replyLike)


export default router; 