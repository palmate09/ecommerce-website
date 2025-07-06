import client from '../config/database.js'
import { AddressType } from '../generated/prisma/index.js';
import validator from 'validator'



export const addAddress = async(req, res) => {

    try{

        const userId = req.user.id; 

        if(!userId){
            res.status(400).json({message: 'userId not found'})
        }

        const { flat_no, Floor_no, nearby_landmark, description, pincode, addressType } = req.body;
        
        if(!flat_no || !Floor_no || !nearby_landmark || !description || !pincode ){
            res.status(400).json({message: 'these fields are required to provide'})
        }

        if(!Object.values(AddressType).includes(addressType)){
            res.status(400).json({message: 'Invalid address type provided'})
        }

        if(!validator.isLength(pincode, {discreteLengths:6})){
            res.status(400).json({message: 'pincode should have 6 digits'})
        }

        const new_Address = await client.address.create({
            data: {
                flat_no, 
                Floor_no, 
                nearby_landmark, 
                description, 
                pincode, 
                addressType: addressType,
                user: {
                    connect: {
                        id: userId
                    }
                } 
            }
        })

        res.status(201).json({message: 'new Address has been created successfully'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: "Internal server Error"})
    }
}

export const removeAddress = async(req, res) => {

    try{

        const userId = req.user.id;
        const {addressId} = req.params;  

        if(!userId && !addressId){
            res.status(400).json("userId and addressId not received")
        }

        const removeAddress = await client.address.delete({
            where: {
                id: addressId
            }
        })

        if(!removeAddress){
            res.status(400).json({message: 'address is not removed'})
        }

        res.status(200).josn({message: 'address has been removed successfully'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: "Internal server Error"})
    }
}

export const updateAddress = async(req, res) => {

    try{

        const userId = req.user.id; 
        const {addressId} = req.params;
        const {pincode, flat_no, nearby_landmark, description, addressType, Floor_no}  = req.body;  
        
        if(!userId && !addressId){
            res.status(400).json({message: 'Userid and addressid is not found'})
        }

        if(!flat_no || !Floor_no || !nearby_landmark || !description || !pincode ){
            res.status(400).json({message: 'these fields are required to provide'})
        }

        if(!Object.values(AddressType).includes(addressType)){
            res.status(400).json({message: 'Invalid address type provided'})
        }

        if(!validator.isLength(pincode, {discreteLengths:6})){
            res.status(400).json({message: 'pincode should have 6 digits'})
        }


        const updateAddress = await client.address.update({
            where: {
                id: addressId
            }, 
            data: {
                flat_no, 
                Floor_no, 
                nearby_landmark, 
                description, 
                pincode, 
                addressType: addressType
            }
        })

        res.status(200).json({updateAddress, message: 'address data has been successfully updated'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: "Internal server Error"})
    }
}

export const getAllAddress = async(req, res) => {

    try{

        const userId = req.user.id; 

        if(!userId){
            res.status(400).json({message: 'userId not found'})
        }

        const address = client.user.findMany({
            where: {
                id: userId
            }, 
            select: {
                address: true
            }
        })

        if(!address){
            res.status(400).json({message: 'addresses not found'})
        }

        res.status(200).json({address, message: 'all addresses for this user has been received successfully!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: "Internal server Error"})
    }
}

export const getAddress = async(req, res) => {

    try{

        const userId = req.user.id;
        const {addressId} = req.params;  

        if(!userId){
            res.status(400).json({message: 'userId not found'})
        }

        const getAddress = await client.address.findUnique({
            where: {
                userId: userId, 
                id: addressId
            }
        })

        if(!getAddress){
            res.status(400).json({message: 'address has not been received'})
        }

        res.status(200).json({getAddress, message: 'address has been received successfully!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: "Internal server Error"})
    }
}