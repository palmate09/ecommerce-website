import client from "../config/database.js";


export const getOrder = async(req, res) => {
    try {


    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}


export const getParticularOrder = async(req,res) => {
    try{

        
    }
    catch(e){
        res.status(500).json({error: e.message, message: 'Internal server Error'})
    }
}