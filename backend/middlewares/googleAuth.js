import jwt from 'jsonwebtoken'

export default auth = async(req, res, next) => {

    try{

        const token = req.headers['authorization']?.split(' ')[1];
        
        if(!token){
            res.status(404).json({message: "No token is provided"})
        }

        const encoded  = jwt.verify(token, process.env.JWT_SECRECT); 

        if(!encoded){
            res.status(400).json({message: 'user not found or token invalid'})
        }

        req.user = encoded; 
        next(); 
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}


