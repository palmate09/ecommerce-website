import client from '../config/database.js'


// get the cart data for the particular user
export const getCartData = async(req, res) => {

    try{

        const userId = req.user.id; 

        if(!userId){
            res.status(400).json({message: 'userId not found'})
        }

        const getCartdata = await client.cart.findUnique({
            where: {
                userId: userId
            }, 
            include: {
                items: true
            }
        })

        if(!getCartdata){
            res.status(400).json({message: 'cart data not found'})
        }

        res.status(200).json(getCartdata, {message: 'the cart data  has been received successfully!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server'})
    }
}

// add the cart for the particular user
export const addCart = async(req, res) => {

    try{

        const userId = req.user.id;
        
        if(!userId){
            res.status(400).json({message: 'userId not found'})
        }

        let newCart = await client.cart.findUnique({
            where: {
                id: userId
            }
        })

        if(!newCart){

            newCart = await client.cart.create({
                data: {
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                }
            })
        }
        else{
            client.cartItems.deleteMany({where: {cartId: newCart.id}})
        }

        res.status(201).json({message: 'cart created', cart: newCart})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server'})
    }
}

// delete the cart for the particular user
export const deleteCart = async(req, res) => {

    try{

        const userId = req.user.id; 

        if(!userId) {
            res.status(400).json({message: 'userId not found'})
        }

        const cart = await client.cart.findUnique({
            where: {
                userId: userId
            }
        })

        if(!cart){
            res.status(200).json({message: 'cart already not exist'})
        }

        await client.cart.delete({
            where: {
                userId: userId
            }
        })

        res.status(200).json({message: 'cart has been deleted successfully'})

    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server'})
    }
}

// add the items in the cart for the particular user
export const addItems = async(req, res) => {

    try{

        const userId = req.user.id; 

        if(!userId){
            res.status(400).json({message: 'userId not exist'})
        }

        const cart = await client.cart.findUnique({
            where: {
                userId: userId
            }
        })

        if(!cart){
            res.status(400).json({message: 'cart not found'})
        }

        const { quantity, productId, price } = req.body;
        
        if(!quantity || !productId || !price){
            res.status(400).json({message: 'quantity and productId are required to fill first'})
        }
        
        const addItems = await client.cartItems.create({
            data: {
                quantity,
                price, 
                product: {
                    connect: {
                        id: productId
                    }
                }, 
                cart: {
                    connect: {
                        id: cart.id
                    }
                }
            }
        })

        res.status(200).json({message: 'the new items have been added successfully!'})

    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server'})
    }
}

// update the items in the cart for the particular user
export const updateItems = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { itemsId } = req.params; 

        if(!userId || !itemsId ){
            res.status(400).json({message: 'userId and cartId and productId are not found'})
        }

        const cart = await client.cart.findUnique({
            where: {
                userId: userId
            }
        })

        if(!cart){
            res.status(400).json({message: 'cart not found'})
        }

        const { quantity }  = req.body;
        
        const updateItems = await client.cartItems.update({
            where: {
                cartId: cart.id, 
                id: itemsId
            }, 
            data: {
                quantity
            }
        })

        res.status(200).json({message: 'items data have been updated successfully!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server'})
    }
}

// delete the items in the cart for the particular user
export const deleteItems = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { itemsId } = req.params; 

        if(!userId || !itemsId){
            res.status(400).json({message: 'userId and productId have not received'})
        }

        const cart = await client.cart.findUnique({
            where: {
                userId: userId
            }
        })

        if(!cart){
            res.status(400).json({message: 'cart not found'})
        }

        const deleteItems = await client.cartItems.delete({
            where: {
                cartId: cart.id,
                id: itemsId
            }
        })

        if(!deleteItems){
            res.status(400).json({message: 'items are not deleted yet'})
        }

        res.status(200).json({message: 'the item has been deleted successfully!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server'})
    }
}

// increment the qunatity of the particular item in the cart for the particular user
export const Incrementquantity = async(req, res) => {

    try{

        const userId = req.user.id; 
        const {productId} = req.params;

        let incrementBy = req.body.by || 1; 
            
        if(!userId || !productId){
            res.status(400).json({message: 'userId or productId not found'})
        }

        const cart = await client.cart.findUnique({
            where: {
                userId: userId
            }
        })

        if(!cart) {
            res.status(400).json({message: 'cart not found'})
        }

        const existingItem = await client.cartItems.findFirst({
            where: {
                cartId: cart.id, 
                productId: productId
            }
        })

        let updateItems; 
        if(existingItem){

            updateItems = await client.cartItems.update({
                where: {
                    id: existingItem.id
                }, 
                data: {
                    cart: {
                        connect: {
                            id: cart.id
                        }
                    }, 
                    product: {
                        connect: {
                            id: productId
                        }
                    }, 
                    quantity: incrementBy
                }
            })
        }
        else{

            updateItems = await client.cartItems.create({
                data: {
                    cartId: cart.id, 
                    productId: productId, 
                    quantity: incrementBy
                }
            })
        }

        return res.status(200).json({message: 'quantity updated', item: updateItems })
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server'})
    }
}

// decrement the quantity of the paritcular item in the cart for the paritcular user
export const Decrementquantity = async(req, res) => {

    try{

        const userId = req.user.id; 
        const { productId } = req.params;
        
        const decrementBy = req.body.by || 1; 

        if(!userId || !productId){
            res.status(400).json({message: 'userId or productId have not been received yet'})
        }

        const cart = await client.cart.findUnique({
            where: {
                id: userId
            }
        })

        if(!cart){
            res.status(400).json({message: 'cart not found'})
        }

        const existingItem = await client.cartItems.findFirst({
            where: {
                cartId: cart.id, 
                productId: productId
            }
        })

        let updatedItems; 

        if(existingItem){

            updatedItems = await client.cartItems.update({
                where: {
                    id: existingItem.id
                }, 
                data: {
                    quantity: {
                        decrement: decrementBy
                    }
                }
            })
        }
        else{

            updatedItems = await client.cartItems.create({
                data: {
                    cartId: cart.id, 
                    productId: productId, 
                    quantity: decrementBy
                }
            })
        }

        res.status(200).json({message: 'quantity decremented', item: updatedItems})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server'})
    }
}