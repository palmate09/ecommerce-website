import client from "../config/database.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const signup = async(req, res) => {

    try {

        const { username, email, password, mobileNo} = req.body;

        if(!username || !email || !password || !mobileNo){
            res.status(400).json({message: 'these fields are required to fill'})
        }

        const usernameRgx = /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9.]{4,28}[a-zA-Z0-9]$/; 
        const emailRgx = /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9.]{5,}@gmail\.com$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;
        const mobileRegex = /^[6-9]\d{9}$/;

        if(!usernameRgx.test(username) && !emailRgx.test(email) && !passwordRegex.test(password) && !mobileRegex.test(mobileNo)){
            res.status(400).json({message: 'username and email and password and mobileNo are not in the correct format'})
        }

        const hashPassword = await bcrypt.hash(password, 8); 
        
        const user = await client.user.findUnique({
            where: {
                email: email
            }
        })

        if(user){
            res.status(400).json({message: 'user already exist do login'})
        }

        const newUser = await client.user.create({
            data: {
                email, 
                password: hashPassword, 
                username, 
                mobileNo
            }
        })

        res.status(201).json({message: 'signup has been successfully done and do login'})

    }
    catch(e){
        res.status(500).json({error: e.message, message: "Internal server Error"})
    }
}

export const login = async(req, res) => {

    try {

        const { email , password } = req.body; 

        if(!email || !password ){
            res.status(400).json({message: 'fill the email and password first'})
        }

        const user = await client.user.findFirst({
            where: {
                OR: [
                    {email: email}, 
                    {username: email}
                ]
            }, 
            select: {
                password: true, 
                email: true, 
                id: true
            }
        })

        const decodedPassword = bcrypt.compare(password, user.password)

        if(!decodedPassword){
            res.status(400).json({message: 'Invalid user or user not found'})
        }

        const token = jwt.sign(user, process.env.JWT_SECRECT, {expiresIn: '1h'}) 

        res.status(200).json({token, message: 'user has been logged in'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: "Internal server Error"})
    }
}

export const getProfile = async(req, res) => {

    try {

        const userId = req.user.id; 

        if(!userId){
            res.status(400).json({message: 'userId not found'})
        }

        const user = await client.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user){
            res.status(400).json({message: 'user not found'})
        }

        res.status(200).json({user, message: 'user has been successfully found'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: "Internal server Error"})
    }
}

export const updateProfile = async(req, res) => {

    try {

        const userId = req.user.id; 
        const { name, username, mobileNo } = req.body;
        
        if(!userId){
            res.status(400).json({message: 'userId is not defiend'})
        } 

        if(!name || !username || !mobileNo){
            res.status(400).json({message: 'given fields are required to fill first'})
            return 
        }

        const usernameRgx = /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9.]{4,28}[a-zA-Z0-9]$/;
        const mobileRegex = /^[6-9]\d{9}$/;

        if(!usernameRgx.test(username) && !mobileRegex.test(mobileNo)){
            res.status(400).json({message: 'fill the mobileno and username in the correct format'})
        }

        const updateUser = await client.user.update({
            where: {
                id: userId
            }, 
            data: {
                name, 
                username, 
                mobileNo
            }
        })
        
        res.status(200).json({updateUser, message: 'user data has been successfully updated'})

    }
    catch(e){
        res.status(500).json({error: e.message, message: "Internal server Error"})
    }
}

export const forgotPasswordReq = async(req, res) => {

    try {

        
    }
    catch(e){
        res.status(500).json({error: e.message, message: "Internal server Error"})
    }
}

export const forgotPassword = async(req, res) => {

    try {

    }
    catch(e){
        res.status(500).json({error: e.message, message: "Internal server Error"})
    }
}