import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport';
const router = express.Router();

router.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback', 
    passport.authenticate('google', {session: false}), 
    (req, res) => {
        const user = {
            id: req.user.id, 
            name: req.user.name, 
            email: req.user.email
        }; 

        const token = jwt.sign(user, process.env.JWT_SECRECT)

        res.send(`Your jwt: ${token}`); 
    }
);


router.get('/profile', (req, res) => {
    // const authHea
})