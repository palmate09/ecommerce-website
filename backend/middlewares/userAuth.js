import jwt from 'jsonwebtoken'


export const userAuth = async(req, res, next) => {

    try{

        const token = req.headers['user-auth']?.split(' ')[1]; 

        if(!token){
            res.status(400).json({message: 'token not found'})
        }

        const encoded = jwt.verify(token, process.env.JWT_SECRECT)
        
        if(!encoded){
            res.status(400).json({message: 'user not found or token invalid'})
        }

        req.user = encoded
        next(); 
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}