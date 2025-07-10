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

        const addratings = await client.ratings.create({
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

        const deleteProduct = await client.ratings.delete({
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

        const updateRatings = await client.ratings.update({
            where: {
                userId: userId, 
                ProductId: productId
            }, 
            data: {
                rating
            }
        })

        res.status(200).json({message: 'your ratings has been updated successfully!'})
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

        const getRatings = await client.ratings.findUnique({
            where: {
                userId: userId, 
                ProductId: productId
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
        
        const {reviewId } = req.params

        if(!reviewId){
            res.status(400).json({message: 'reviewId and productId have not been received yet'})
        }

        const getAllReplies = await client.reply.findMany({
            where:{
                reviewId: reviewId
            }
        })

        res.status(200).json({getAllReplies, message: 'all the reviews are received successfully!'})
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

        const id = parseInt(replyId)

        const getParticularReplies = await client.reply.findUnique({
            where: {
                userId: userId, 
                reviewId: reviewId,
                id: id
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

        const id  = parseInt(replyId)

        const removeReply = await client.reply.delete({
            where: {
                userId: userId, 
                reviewId: reviewId, 
                id: id
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

        const id = parseInt(replyId); 

        const updateReply  = await client.reply.update({
            where: {
                userId: userId, 
                reviewId: reviewId, 
                id: id
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

export const getAdminReviews = async(req, res) => {

    try{

        const adminId = req.admin.id; 
        const { productId } = req.params;
        
        if( !productId || !adminId ){
            res.status(400).json({message: 'productId have not been received'})
        }

        const getallreviews = await client.product.findMany({
            where: {
                id: productId, 
                adminId: adminId
            }
        })

        res.status(200).json({getallreviews, message: 'all the reviews are received successfully'})

    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}
