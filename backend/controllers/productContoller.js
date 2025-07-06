import client from '../config/database.js'
import { category } from '../generated/prisma/index.js';
import validator from 'validator'


export const addCategory = async(req, res) => {

    try{

        const adminId = req.admin.id;
        
        if(!adminId){
            res.status(400).json({message: 'adminId is not found'})
        }

        const { name } = req.body;
        
        if(!Object.values(category).includes(name)){
            res.status(400).json({message: 'Invalid category provided'})
        }

        const addCategory = await client.category.create({
            data: {
                name: name, 
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
        const { categoryId } = req.params; 

        if(!adminId && !categoryId){
            res.status(400).json({message: 'adminId and categoryId have not been provided'})
        }

        const deleteCategory = await client.category.delete({
            where: {
                adminId: adminId, 
                id: categoryId
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
        const {categoryId} = req.params; 

        if(!adminId && !categoryId){
            res.status(400).json({message: 'adminId and categoryId has not been found'})
        }

        const {name} = req.body; 

        if(!Object.values(category).includes(name)){
            res.status(400).json({message: 'Invalid category provided'})
        }

        const updateCategory = await client.category.update({
            where: {
                adminId: adminId, 
                id: categoryId
            }, 
            data: {
                name: name
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
        const {categoryId} = req.params;
        
        if(!adminId && categoryId){
            res.status(400).json({message: 'adminId and categroyId has not been provided yet'})
        }

        const { name, review, rating, price, OriginalPrice, inStock, featured } = req.body; 

        if(!name || !review || !rating || !price || !OriginalPrice || !inStock || !featured){
            res.status(400).json({message: 'these all fields are required to fill first'})
        }

        const newProduct = await client.product.create({

        })
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const getProducts = async(req, res) => {

    try{

    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const getAdminProducts = async(req, res) => {

    try{

    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const updateProducts = async(req, res) => {

    try{

    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}

export const deleteProducts = async(req, res) => {

    try{

    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}