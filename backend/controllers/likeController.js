import client from "../config/database.js"


export const reviewLike = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { reviewId } = req.params;
        
        if(!userId || !reviewId ){
            res.status(400).json({message: 'userId and reviewId not found'})
        }
        
        const existing = await client.likeReview.findUnique({
            where: {
                userId_reviewId: {userId, reviewId}
            }
        })

        const vote = req.body.vote;  
        
        if(!vote || vote === 0){
            if(existing){
                await client.likeReview.delete({
                    where: {
                        userId_reviewId: {userId, reviewId}
                    }
                })
            }
            return res.status(200).json({message: 'review vote removed'})
        }


        if(existing){
            await client.likeReview.update({
                where: {
                    userId_reviewId: {userId, reviewId}
                }, 
                data: {
                    vote: vote
                }
            })
            return res.status(200).json({message: 'review like has been updated successfully!'})
        }

        await client.likeReview.create({
            data: {
                vote: vote, 
                userId: userId, 
                reviewId: reviewId
            }
        })

        res.status(201).json({message: 'new review like has been given'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const replyLike = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { replyId } = req.params; 
        const vote = req.body.vote; 

        if(!userId || !replyId || !vote){
            res.status(400).json({message: 'userId and replyId and vote not defiend'})
        }
        
        const existing = await client.likeReply.findUnique({
            where: {
                userId_replyId: {userId, replyId}
            }
        })
        

        if(!vote || vote === 0){
            if(existing){
                await client.likeReply.delete({
                    where: {
                        userId_replyId: {userId, replyId}
                    }
                })
            }
            res.status(200).json({message: 'vote removed'})
        }

        if(existing){
            await client.likeReply.update({
                where: {
                    userId_replyId: {userId, replyId}
                }, 
                data: {
                    vote: vote
                }
            })
            res.status(200).json({message: 'vote updated'})
        }


        await client.likeReply.create({
            data: {
                vote: vote, 
                userId: userId, 
                replyId: replyId
            }
        })

        res.status(201).json({message: 'vote created'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

