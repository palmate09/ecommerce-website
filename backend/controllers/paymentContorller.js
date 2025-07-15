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

        const Cart = await client.cart.findFirst({
            where: {
                userId: userId
            }, 
            select: {
                items: true, 
                id: true
            }
        })

        if(!Cart){
            res.status(400).json({message: 'Cart not found'})
        }

        const CartItems = await client.cartItems.findMany({
            where: {
                cartId: Cart.id
            }
        })

        if(!CartItems.length){
            res.status(400).json({message: 'No items in cart'})
        }

        const totalAmount = CartItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity)
        }, 0)


        const { status } = req.body; 

        if(!Object.values(paymentStatus).includes(status)){
            res.status(400).json({message: 'payment status provided is invalid'})
        }
        
        const paymentDetails = await client.payment.create({
            data: {
                status: status,
                amount:   totalAmount, 
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

        let newOrder; 
        
        const orderStatus = status === 'PAID' ? 'PLACED': 'CANCELLED'; 

        newOrder = await client.order.create({
            data: {
                orderstatus: orderStatus, 
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

        // move the cartitems to orderitems and delete the cart

        if(newOrder){

            await client.orderItems.createMany({
                data: CartItems.map(item => ({
                    productId: item.productId,
                    orderId: newOrder.id, 
                    quantity: item.quantity, 
                    price: item.price
                }))
            })
        }


        await client.cartItems.deleteMany({
            where: {
                cartId: Cart.id
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
export const GetAllPayments = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: 'userId not found' });
    }

    const getPayment = await client.payment.findMany({
      where: {
        userId: userId
      }
    });

    if (getPayment.length === 0) {
      return res.status(404).json({ message: 'No payment records found for this user' });
    }

    return res.status(200).json({ getPayment, message: 'Payment details retrieved successfully' });

  } catch (e) {
    return res.status(500).json({ error: e.message, message: 'Internal Server Error' });
  }
}