import client from '../config/database.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { randomBytes } from 'node:crypto';
import transporter from '../config/nodemailer.js';



export const Adminsignup = async(req, res) => {

    try{

        const { username, email, password, name } = req.body;

        if(!username || !email || !password || !name){
            res.status(400).json({message: 'these fields are required to fill'})
        }

        const usernameRgx = /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9.]{4,28}[a-zA-Z0-9]$/; 
        const emailRgx = /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9.]{5,}@gmail\.com$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;

        if(!usernameRgx.test(username) && !emailRgx.test(email) && !passwordRegex.test(password)){
            res.status(400).json({message: 'username and email and password and mobileNo are not in the correct format'})
        }

        const hashPassword = await bcrypt.hash(password, 8); 
        
        const admin = await client.admin.findUnique({
            where: {
                email: email
            }
        })

        if(admin){
            res.status(400).json({message: 'user already exist do login'})
        }

        const newAdmin = await client.admin.create({
            data: {
                email, 
                password: hashPassword, 
                username,
                name
            }
        })

        res.status(201).json({message: 'signup has been successfully done and do login'})

    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const AdminLogin = async(req, res) => {

    try{

        const { identifier , password } = req.body; 

        if(!identifier || !password ){
            res.status(400).json({message: 'fill the email or username and password first'})
        }

        const admin = await client.admin.findFirst({
            where: {
                OR: [
                    {email: identifier}, 
                    {username: identifier}
                ]
            }, 
            select: {
                password: true, 
                email: true, 
                id: true
            }
        })

        const decodedPassword = bcrypt.compare(password, admin.password)

        if(!decodedPassword){
            res.status(400).json({message: 'Invalid admin or admin not found'})
        }

        const token = jwt.sign(admin, process.env.JWT_SECRECT, {expiresIn: '1h'}) 

        res.status(200).json({token, message: 'admin has been logged in'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const AdminProfile = async(req, res) => {

    try{

        const adminId = req.admin.id; 

        if(!adminId){
            res.status(400).json({message: 'adminId not found'})
        }

        const admin  = await client.admin.findUnique({
            where: {
                id: adminId
            }
        })

        if(!admin){
            res.status(400).json({message: 'admin not found'})
        }

        res.status(200).json({message: 'admin profile data has been successfully received!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const updateAdminProfile = async(req, res) => {

    try{

        const adminId = req.admin.id; 

        if(!adminId){
            res.status(400).json({message: 'adminId not found'})
        }

        const {name, username } = req.body;
        
        if(!name || !username){
            res.status(400).json({message: 'name or username have not been provided'})
        }

        const usernameRgx = /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9.]{4,28}[a-zA-Z0-9]$/;

        if(!usernameRgx.test(username)){
            res.status(400).json({message: 'useranme is not provided in correct format'})
        }

        const updateAdminProfile = await client.admin.update({
            where: {
                id: adminId
            }, 
            data: {
                name, 
                username
            }
        })

        res.status(200).json({message: 'admin profile has been successfully updated!'})

    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const AdminforgotPasswordReq = async(req, res) => {

    try{

        const { email } = req.body; 

        if(!email){
            res.status(400).json({message: 'email is not provided'})
        }

        const admin = await client.admin.findFirst({
            where: {
                email
            }
        })

        if(!admin){
            res.status(400).json({message: 'admin not found'})
        }

        const token = randomBytes(15).toString('base64url')

        await client.forgotPasswordTokenAdmin.deleteMany({
            where: {
                adminId: admin.id, 
                expiresAt: {
                    gt: new Date()
                }
            }
        })

        const expiry = new Date(Date.now() + 3600000)

        const tokenCreate= await client.forgotPasswordTokenAdmin.create({
            data: {
                token: token, 
                expiresAt: expiry, 
                admin: {
                    connect: {
                        id: admin.id
                    }
                }
            }
        })

        const resetUrl  = `http://localhost:${process.env.PORT}/api/v1/admins/forgot-password?token=${token}`

        const info = await transporter.sendMail({
            from: process.env.USER_EMAIL, 
            to: admin.email, 
            subject: 'Password Reset Request', 
            text: `This is the token for the reset password :- ${tokenCreate.token}
                    The ResetUrl is :- ${resetUrl}`
        })

        res.status(200).json(tokenCreate.token)
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const AdminForgotPassword = async(req, res) => {

    try{

        const { token } = req.params; 
        const { password } = req.body; 

        if(!token){
            res.status(400).json({message: 'Token has not been provided'})
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/
        if(!passwordRegex.test(password)){
            res.status(400).json({message: 'The password provided is not in correct format'})
        }

        const resetToken = await client.forgotPasswordTokenAdmin.findUnique({
            where: {
                token: token
            }, 
            include: {
                admin: true
            }
        })

        if(!resetToken){
            res.status(400).json({message: 'Invalid Token'})
        }

        if(new Date() > resetToken.expiresAt){
            await client.forgotPasswordTokenAdmin.delete({
                where: {
                    id: resetToken.id
                }
            })

            return res.status(400).json({message: 'Password reset token has expired'})
        }

        const HashedPassword = await bcrypt.hash(password, 8); 

        const updatePassword = await client.admin.update({
            where: {
                id: resetToken.admin.id
            }, 
            data: {
                password: HashedPassword
            }
        })

        await client.forgotPasswordTokenAdmin.delete({
            where: {
                id: resetToken.id
            }
        })

        res.status(200).json({message: 'password has been successfully updated'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const getAllUsers = async(req, res) => {

    try{

        const adminId = req.admin.id; 

        if(!adminId){
            res.status(400).json({message: 'adminId is not provided'})
        }

        const userList = await client.admin.findMany({
            where: {
                id: adminId
            }, 
            select: {
                user: true
            }
        })

        res.status(200).json({userList, message: 'all the users has been successfully received!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const getParticularUser = async(req, res) => {

    try{

        const adminId = req.admin.id; 
        const {userId} = req.params;  

        if(!adminId && !userId){
            res.status(400).json({message: 'adminId and userId is not defined'})
        }

        const getParticularUser = await client.user.findUnique({
            where: {
                adminId: adminId,
                id: userId, 
            }
        })

        res.status(200).json({getParticularUser, message: 'particular user data has been successfully received!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}