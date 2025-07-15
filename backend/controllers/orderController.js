import client from "../config/database.js";
import { orderStatus } from "../generated/prisma/index.js";

// get the particular order details
export const getParticularOrder = async(req, res) => {
    try {

        const userId = req.user.id; 
        const { orderId } = req.params;


        if(!userId || !orderId){
            res.status(400).json({message: 'userId and orderId have not found'})
        }

        const getOrder = await client.order.findUnique({
            where: {
                userId: userId, 
                id: orderId
            }
        })

        if(!getOrder){
            res.status(400).json({message: 'particular order has not received yet'})
        }

        res.status(200).json({getOrder, message: 'particular order has been received successfully'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

// get all the order associated to the user; 
export const getOrder = async(req,res) => {
    try{

        const userId = req.user.id; 
        
        if(!userId){
            res.status(400).json({message: 'userId not found'})
        }

        const getOrders = await client.order.findMany({
            where: {
                userId: userId
            }
        })

        if(!getOrders){
            res.status(400).json({message: 'orders has not received, invalid userId'})
        }

        res.status(200).json({getOrders, message: 'orders has been received successfully!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

// delete all the order associated to the user; 
export const deleteOrders = async(req, res) => {
    try{

        const userId = req.user.id; 
        
        if(!userId){
            res.status(400).json({message: 'userId not found'})
        }

        const deleteOrder = await client.order.delete({
            where: {
                userId: userId
            }
        })

        if(!deleteOrder){
            res.status(400).json({message: 'orders have never delted'})
        }

        res.status(200).json({message: 'orders have been successfully deleted!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

// delete the particular order details
export const deleteOrder = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { orderId } = req.params; 

        if(!userId || !orderId){
            res.status(400).json({message: 'userId and orderId not found'})
        }

        const delteOrder = await client.order.delete({
            where: {
                userId: userId, 
                id: orderId
            }
        })

        res.status(200).json({message: 'the order has been successfully deleted!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: "Internal serer Error"})
    }
}

// update the specific order status for the admin
export const updateOrderStatus = async(req, res) => {

    try{

        const adminId = req.admin.id; 
        const { orderId } = req.params; 

        if(!adminId || !orderId){
            res.status(400).json({message: 'adminId and orderId have not received'})
        }
        
        const { orderstatus } = req.body; 
        
        if(!Object.values(orderStatus).includes(orderstatus)){
            res.status(400).json({message: 'Invalid orderstatus provided'})
        }

        const updateOrder = await client.order.update({
            where: {
                adminId: adminId, 
                id: orderId
            }, 
            data: {
                orderstatus
            }
        })

        res.status(200).json({message: 'order status has been successfully updated'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

// give the all the orderdetails to the particular products admin after the payment is done 

export const orderdetailsAdmin = async(req, res) => {

    try{

        
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}