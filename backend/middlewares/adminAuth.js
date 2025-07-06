import jwt from 'jsonwebtoken'

export const adminAuth = async(req, res, next) => {
    try{

        const token = req.headers['auth-admin']?.split(' ')[1];

        if(!token){
            res.status(400).json({message: 'Invalid token , please provide correct token'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRECT)

        req.admin = decoded; 
        next(); 
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}