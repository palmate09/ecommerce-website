import client from '../config/database.js'
import { paymentStatus } from '../generated/prisma/index.js';


// Takes the cart of a user first 
// create payment record with status ("paid" or "failed")
// converts cartItems into an order with the status based on the payment 
// delete the cart and its cartItems after processing the payment


export const payment = async(req, res) => {
    
    try{

        const userId = req.user.id; 

        if(!userId){
            res.status(400).json({message: 'userId not found '})
        }

        const Cart = await client.cart.findUnique({
            where: {
                userId: userId
            }, 
            include: {
                items
            }
        })

        var cartItemsSum; 
        if(Cart){

            cartItemsSum = await client.cartItems.aggregate({
                where: {
                    cartId: Cart.id
                }, 
                _sum: {
                    price: true
                }
            })

        }
        else{
            res.status(400).json({message: 'cart not found'})
        }

        const { status } = req.body; 

        if(!Object.values(paymentStatus).includes(status)){
            res.status(400).json({message: 'payment status provided is invalid'})
        }
        
        const paymentDetails = await client.payment.create({
            data: {
                status: status,
                amount: cartItemsSum._sum, 
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

        var newOrder; 
         
        if(paymentDetails.status === 'PAID'){

            newOrder = await client.order.create({
                data: {
                    orderstatus: 'PLACED',
                    total: paymentDetails.amount, 
                    user: {
                        connect: {
                            id: userId
                        }
                    }, 
                    payment: {
                        connect: {
                            id: paymentDetails.id
                        }
                    }
                }
            })
        }

        else if (paymentDetails.status === 'FAILED'){

            newOrder = await client.order.create({
                data: {
                    orderstatus: 'CANCELLED', 
                    total: paymentDetails.amount, 
                    user: {
                        connect: {
                            id: userId
                        }
                    }, 
                    payment: {
                        connect: {
                            id: paymentDetails.id
                        }
                    }
                }
            })
        } 


        // move the cartitems to orderitems and delete the cart

        const cartItems = await client.cartItems.findUnique({
            where: {
                cartId: Cart.id
            }
        })

        if(newOrder){

            await client.orderItems.create({
                data: {
                    productId: cartItems.productId, 
                    orderId: newOrder.id,
                    quantity: cartItems.quantity, 
                    price: cartItems.price
                }
            })

            const delteCart = await client.cart.delete({
                where: {
                    id: Cart.id
                }
            })

            if(!delteCart){
                res.status(400).json({message: 'the cart has not deleted!'})
            }
        }
    
        res.status(200).json({newOrder, paymentDetails, message: 'successfully done the payment and order details have been stored'})

    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

// get the particular payment details 
export const getparticularPayment = async(req, res) =>{
    try {

        const userId = req.user.id; 
        const { paymentId } = req.params;
        
        const paymentDetails = await client.payment.findUnique({
            where: {
                userId: userId,
                id: paymentId
            }
        })

        if(!paymentDetails){
            res.status(400).json({message: 'payment details have not generated'})
        }

        res.status(200).json({paymentDetails, message: 'payment details have been generated successfully'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

// get all the payment details 
export const getpayment = async(req, res) => {
    try{

        const userId = req.user.id; 

        if(!userId){
            res.status(400).json({message: 'userId not found '})
        }

        const getPayment = await client.payment.findMany({
            where: {
                userId: userId
            }
        })

        if(!getPayment){
            res.status(400).json({message: 'the payment details have not received'})
        }

        res.status(200).json({getPayment, message: 'payment details have been generated'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}  