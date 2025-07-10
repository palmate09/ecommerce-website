import client from '../config/database.js'


export const addCategory = async(req, res) => {

    try{

        const adminId = req.admin.id;
        
        if(!adminId){
            res.status(400).json({message: 'adminId is not found'})
        }

        const { name } = req.body;
        
        if(!name){
            res.status(400).json({message: 'name has not been defiened yet'})
        }

        const addCategory = await client.category.create({
            data: {
                name, 
                admin: {
                    connect: {
                        id: adminId
                    }
                }
            }
        })

        res.status(200).json({message: 'category has been successfully added'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const deleteCategory = async(req, res) => {

    try{

        const adminId = req.admin.id; 
        const { categoryName } = req.params; 

        if(!adminId && !categoryName){
            res.status(400).json({message: 'adminId and categoryName have not been provided'})
        }

        const deleteCategory = await client.category.delete({
            where: {
                adminId: adminId, 
                name: categoryName
            }
        })

        if(!deleteCategory){
            res.status(400).json({message: 'category has not been deleted yet'})
        }

        res.status(200).json({message: 'category has been deleted successfully!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
} 

export const updateCategory = async(req, res) => {

    try{

        const adminId = req.admin.id; 
        const {categoryName} = req.params; 

        if(!adminId && !categoryName){
            res.status(400).json({message: 'adminId and categoryName has not been found'})
        }

        const {name} = req.body; 

        if(!name){
            res.status(400).json({message: 'name has not been received yet'})
        }

        const updateCategory = await client.category.update({
            where: {
                adminId: adminId, 
                name: categoryName
            }, 
            data: {
                name
            }
        })

        if(!updateCategory){
            res.status(400).json({message: 'category has not been updated yet'})
        }

        res.status(200).json({message: 'category has been updated successfully!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const addProducts = async(req, res) => {

    try{

        const adminId = req.admin.id; 
        const { categoryName } = req.params;
        
        if(!adminId && !categoryName){
            res.status(400).json({message: 'adminId and categoryName has not been provided yet'})
        }

        const { name, description, price, OriginalPrice, inStock } = req.body; 

        if(!name || !description || !price || !OriginalPrice || !inStock ){
            res.status(400).json({message: 'these all fields are required to fill first'})
        }

        const newProduct = await client.product.create({
            data: {
                name, 
                description, 
                price, 
                OriginalPrice: OriginalPrice, 
                inStock, 
                category: {
                    connect: {
                        name: categoryName
                    }
                },
                admin: {
                    connect: {
                        id: adminId
                    }
                }
            }
        })

        res.status(201).json({newProduct, message: 'the new product has been successfully added!'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

// issue is on category selection for enum or string 
// get all the products for the user and particular category named products as well 
export const getProducts = async(req, res) => {

    try{
 
        const { categoryName } = req.params

        if(!categoryName ){
            res.status(400).json({message: 'categoryName and userId have not been found'})
        }


        if(categoryName === 'All'){
            const getProducts = await client.product.findMany()

            res.status(200).json({ getProducts, message: 'users can able to access the products'})
        }

        const getProducts = await client.product.findMany({
            where: { 
                categoryName: categoryName
            }
        })

        console.log(getProducts);

        res.status(200).json({getProducts, message: 'all the products has been displayed'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

// get all the products and particular category named products for the admin
export const getAdminProducts = async(req, res) => {

    try{

        const adminId = req.admin.id; 
        const {categoryName} = req.params; 
        
        if(!adminId && !categoryName){
            res.status(400).json({message: 'adminId and categoryName have not been defiend yet'})
        }

        const admin = await client.admin.findUnique({
            where: {
                id: adminId
            }
        })


        if(admin.id === adminId && categoryName === 'All'){
            const getAdminProducts = await client.product.findMany({
                where: {
                    adminId: admin.id
                }
            })
            console.log(getAdminProducts)

            res.status(200).json({getAdminProducts, message: 'all the admin products have been received successfully!'})
        }

        const getAdminProducts = await client.product.findMany({
            where: {
                adminId: admin.id, 
                categoryName: categoryName
            }
        })

        res.status(200).json(getAdminProducts, { message: 'all the admin prodcuts have been received'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const updateProducts = async(req, res) => {

    try{

        const adminId = req.admin.id; 
        const { categoryName, productId } = req.params

        if(!categoryName && !adminId && !productId){
            res.status(400).json({message: "adminId and categoryName and productId have not been  received!"})
        }

        const { name, description, price, OriginalPrice, inStock } = req.body; 

        if(!name || !description || !price || !OriginalPrice || !inStock){
            res.status(400).json({message: 'all these given fields are required to fill first!'})
        }

        const updateProducts = await client.product.update({
            where: {
                adminId: adminId,
                categoryName: categoryName, 
                id: productId
            },
            data: {
                name, 
                description, 
                price, 
                OriginalPrice, 
                inStock
            }
        })
        

        res.status(200).json({message: 'product data has been successfully updated'})
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const deleteProducts = async(req, res) => {

    try{

        const adminId = req.admin.id; 
        const { categoyName, productId } = req.params; 

        if(!adminId && !categoyName && !productId){
            res.status(400).json({message: 'adminId and category name and productId have not received yet'})
        }

        const deleteProducts = await client.product.delete({
            where: {
                adminId: adminId, 
                categoryName: categoyName, 
                id: productId
            }
        })

        if(!deleteProducts){
            res.status(400).json({message: 'the given products has not been deleted'})
        }

        res.status(200).json({message: 'the given product has been successfully deleted!'})
    }   
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}