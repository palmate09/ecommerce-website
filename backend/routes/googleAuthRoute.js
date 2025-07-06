import express from 'express'
import jwt from 'jsonwebtoken'
import user from '../config/auth.js';
const router = express.Router();

router.get('/auth/google', 
    user.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback', 
    user.authenticate('google', {session: false}), 
    (req, res) => {
        const user = {
            id: req.user.id, 
            name: req.user.name, 
            email: req.user.email
        }; 

        const token = jwt.sign(user, process.env.JWT_SECRECT)

        res.status(200).json(user, {message: `Your jwt: ${token}`}); 
    }
);


export default router; 