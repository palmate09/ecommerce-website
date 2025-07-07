import client from '../config/database.js'
import validator from 'validator'


export const addRatings = async(req, res) => {

    try{

        const userId = req.user.id;
        const { productId } = req.params 
        const { rating } = req.body; 

        if(!userId || !rating){
            res.status(400).json({message: 'userId and ratings have not been received'})
        } 

        if(!validator.isLength(rating, {max: 5})){
            res.status(400).json({message: 'Invalid ratings submitted'})
        }

        const addratings = await client.rantings.create({
            data: {
                rating, 
                user: {
                    connect: {
                        id: userId
                    }
                }, 
                product: {
                    connect: {
                        id: productId
                    }
                }
            }
        })

        res.status(201).json(addratings.rating, {message: 'ratings has been successfully updated'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const removeRatings = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { productId } = req.params;

        if(!userId || !productId ){
            res.status(400).json({message: 'userId and productId and RatingsId have not been received yet'})
        }

        const deleteProduct = await client.rantings.delete({
            where: {
                userId: userId,
                ProductId: productId
            }
        })

        if(!deleteProduct){
            res.status(400).json({message: 'product data has not been deleted'})
        }

        res.status(200).json({message: 'product data has been deleted successfully!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const updateRatings = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { productId } = req.params

        if(!userId || !productId){
            res.status(400).json({message: 'userId and productId and RatingsId have not been received'})
        }

        const { rating } = req.body; 
        
        if(!rating){
            res.status(400).json({message: 'ratings have not been received yet'})
        }

        const updateRatings = await client.rantings.update({
            where: {
                userId: userId, 
                ProductId: productId
            }, 
            data: {
                rating
            }
        })
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const getRatings = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { productId } = req.params

        if(!userId || !productId){
            res.status(400).json({message: 'userId and prodcutId have not been received yet'})
        }

        const getRatings = await client.rantings.findMany({
            where: {
                userId: userId, 
                productId: productId
            }
        })

        res.status(200).json({getRatings, message: 'Ratings has been received successfully!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const addReview = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { productId } = req.params; 

        if(!userId || !productId){
            res.status(400).json({message: 'userId and productId have not been received'})
        }

        const { description } = req.body;
        
        if( !description ){
            res.status(400).json({message: 'These given fields are required to fill first'})
        }

        const addreview = await client.review.create({
            data: {
                description, 
                like, 
                user: {
                    connect: {
                        id: userId
                    }
                }, 
                product: {
                    connect: {
                        id: productId
                    }
                }
            }
        })

        res.status(201).json({message: 'the new review is added by the user'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const removeReview = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { productId, reviewId } = req.params;
        
        if(!userId || !productId || !reviewId){
            res.status(400).json({message: 'userId and productId and reviewId have not been received'})
        }

        const removeReview = await client.review.delete({
            where: {
                userId: userId, 
                productId: productId, 
                id: reviewId
            }
        })

        if(!removeReview){
            res.status(400).json({message: 'review has not been deleted yet'})
        }

        res.status(200).json({message: 'review has been deleted successfully'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const updateReview = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { productId, reviewId } = req.params

        if(!userId || !productId || !reviewId){
            res.status(400).json({message: 'userId and productId and reviewId have not been received'})
        }

        const { description } = req.body;
        
        if(!description){
            res.status(400).json({message: 'the given fields are required to fill first'})
        }

        const updateReview = await client.review.update({
            where: {
                userId: userId, 
                productId: productId,
                id: reviewId
            }, 
            data: {
                description
            }
        })
        
        res.status(200).json({message: 'the review have been successfully updated'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

// get all the review of the particular product
export const getAllReviews = async(req, res) => {
    try{

        const { productId } = req.params;
        
        if( !productId ){
            res.status(400).json({message: 'productId have not been received'})
        }

        const getallreviews = await client.product.findMany({
            where: {
                id: productId
            }, 
            select: {
                review: true
            }
        })

        res.status(200).json({getallreviews, message: 'all the reviews are received successfully'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

// get all the review of the particular user; 
export const getAllReviewsUser = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { productId } = req.params;
        
        if(!userId || !productId ){
            res.status(400).json({message: 'userId and productId have not been received '})
        }

        const getallreviews = await client.review.findMany({
            where: {
                userId: userId, 
                productId: productId
            }
        })

        res.status(200).json({getallreviews, message: " all the reviews have been received of this user"})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const getparticularReview = async(req, res) => {

    try{

        const userId = req.user.id; 
        const {productId , reviewId} = req.params

        if(!userId || !productId || !reviewId){
            res.status(400).json({message: 'userId and productId and reviewId have not been received yet'})
        }

        const getparticularReview = await client.review.findUnique({
            where: {
                userId: userId,
                productId: productId, 
                id: reviewId
            }
        })

        res.status(200).json({getparticularReview, message: ' the particular review has been received successfully'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

// get all the replies for the particular review
export const getAllReplies = async(req, res) => {

    try{
        
        const { reviewId } = req.params; 

        if(!reviewId){
            res.status(400).json({message: 'reviewId has not been received yet'})
        }

        const getAllReplies = await client.review.findMany({
            where: {
                id: reviewId
            },
            select: {
                reply: true
            }
        })
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

// get all the replies for the particular review by the particular user; 
export const getParticularReplies = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { reviewId, replyId } = req.params

        if(!userId || !reviewId || !replyId){
            res.status(400).json({message: 'userId and reviewId have not been received yet'})
        }

        const getParticularReplies = await client.reply.findUnique({
            where: {
                userId: userId, 
                reviewId: reviewId,
                id: replyId
            }
        })

        res.status(200).json({getParticularReplies, message: 'the particular replies for the particular review by the particular user have been recieved successfully!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const addReply = async(req, res) => {

    try{

        const userId = req.user.id; 
        const {reviewId} = req.params

        if(!userId || !reviewId){
            res.status(400).json({message: 'userId and reviewId have not been received successfully'})
        }

        const { description } = req.body; 

        const addreply = await client.reply.create({
            data: {
                description,
                user: {
                    connect: {
                        id: userId
                    }
                },
                review: {
                    connect: {
                        id: reviewId
                    }
                }
            }
        })

        res.status(201).json({message: 'reply has been added successfully'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const removeReply =async(req, res) => {

    try{

        const userId = req.user.id; 
        const { reviewId , replyId } = req.params; 

        if(!userId || !reviewId || !replyId){
            res.status(400).json({message: 'userId and reviewId and replyId have not been received'})
        }

        const removeReply = await client.reply.delete({
            where: {
                userId: userId, 
                reviewId: reviewId, 
                id: replyId
            }
        })

        if(!removeReply){
            res.status(400).json({message: 'reply has not been removed'})
        }

        res.status(200).json({message: 'the reply has been deleted successfully!'})

    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const updateReply = async(req, res) => {

    try{

        const userId = req.user.id; 
        const {reviewId , replyId } = req.params; 

        if(!userId || !reviewId || !replyId){
            res.status(400).json({message: 'userId and reviewId and replyId have not been received'})
        }

        const { description } = req.body; 

        const updateReply  = await client.reply.update({
            where: {
                userId: userId, 
                reviewId: reviewId, 
                id: replyId
            },
            data: {
                description
            }
        })

        res.status(200).json({message: 'the reply has been updated successfully'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

// add like for the particular review by particular user
export const addlike = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { reviewId } = req.params; 

        if(!userId || !reviewId){
            res.status(400).json({message: 'userId and reviewId have not received'})
        }
        
        const { islike } =req.body;
        
        if(typeof(islike) !== 'boolean'){
            res.status(400).json({message: 'islike should be boolean'})
        }

        const addlike = await client.like.create({
            data: {
                islike,
                user: {
                    connect: {
                        id: userId
                    }
                }, 
                review: {
                    connect: {
                        id: reviewId
                    }
                }
            }
        })
        
        res.status(201).json({message: 'like is added to the review successfully!'})

    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const updateLike = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { reviewId, likeId } = req.params;

        if(!userId || !reviewId || !likeId){
            res.status(400).json({message: 'userId and reviewId and likeId have not been received'})
        }

        const { islike } = req.body; 
        if(typeof(islike) === 'boolean'){
            res.status(400).json({message: 'the islike should be boolen'})
        }

        const updateLike = await client.like.update({
            where: {
                userId: userId, 
                reviewId: reviewId, 
                id: likeId
            }, 
            data: {
                islike
            }
        })

        res.status(200).json({message: 'like has been successfully updated'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}


export const removelike = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { reviewId, likeId} = req.params; 

        if(!userId || !reviewId || !likeId){
            res.status(400).json({message: 'userId and reviewId and likeId are not received'})
        }

        const removeLike = await client.like.delete({
            where: {
                userId: userId, 
                reviewId: reviewId, 
                id: likeId
            }
        })

        if(!removeLike){
            res.status(400).json({message: 'like has not been deleted'})
        }

        res.status(200).json({message: 'like for the post has been deleted successfully'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

// get all the like for the particular review
export const getAllLIkes = async(req, res) => {

    try{

        const { reviewId } = req.params
        
        if(!reviewId){
            res.status(400).json({message: "reveiwId has not received"})
        }

        const getAlllikes = await client.review.findUnique({
            where: {
                id: reviewId
            }, 
            select: {
                like: true
            }
        })

        res.status(200).json(getAlllikes.like, {message: 'all likes has been received successfully'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}


// get all the like for the particular reply 
export const getlikes = async(req, res) => {

    try{

        const { replyId } = req.params

        if(!replyId){
            res.status(400).json({message: 'replyId has not been received'})
        }

        const getlikesR = await client.reply.findUnique({
            where: {
                id: replyId
            }, 
            select: {
                like: true
            }
        })

        res.status(200).json(getlikesR.like, {message: 'all likes are received successfully!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const addreplylike = async(req, res) => {

    try{

        const userId  = req.user.id; 
        const { replyId } = req.params; 

        if(!userId || !replyId){
            res.status(400).json({message: 'userId and replyId have not received'})
        }

        const {islike} = req.body;
        
        if(typeof(islike) !== 'boolean'){
            res.status(400).json({message: 'islike should be boolean'})
        }

        const addreplylike = await client.like.create({
            data: {
                islike, 
                user:{
                    connect: {
                        id: userId
                    }
                }, 
                reply: {
                    connect: {
                        id: replyId
                    }
                }
            }
        })

        res.status(201).json({message: 'the new like has been added successfully'})

    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const removereplyLike = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { replyId, likeId } = req.params

        if(!userId || !replyId || !likeId){
            res.status(400).json({message: 'userId and replyId and likeId have not been received'})
        }

        const removeReplylike = await client.reply.delete({
            where: {
                userId: userId, 
                replyId: replyId, 
                id: likeId
            }
        })

        if(!removeReplylike){
            res.status(400).json({message: 'like has not been removed '})
        }
        
        res.status(200).json({message: 'like has been removed successfully!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const updatereplylike = async(req, res) => {

    try{

        const userId = req.user.id; 
        const {replyId , likeId } = req.params; 
        
        if(!userId || !replyId || !likeId ){
            res.status(400).json({message: 'userId and replyId and likeId have not been received'})
        }

        const { islike } = req.body; 

        if(typeof(islike) !== 'boolean'){
            res.status(400).json({message: 'islike field should boolean'})
        }

        const updateReplylike = await client.like.update({
            where: {
                userId: userId, 
                replyId: replyId,
                id: likeId
            }, 
            data: {
                islike
            }
        })
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const getAdminReviews = async(req, res) => {

    try{

        const { productId } = req.params;
        
        if( !productId ){
            res.status(400).json({message: 'productId have not been received'})
        }

        const getallreviews = await client.product.findMany({
            where: {
                id: productId
            }, 
            select: {
                review: true
            }
        })

        res.status(200).json({getallreviews, message: 'all the reviews are received successfully'})

    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}
