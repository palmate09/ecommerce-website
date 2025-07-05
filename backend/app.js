import express from 'express'
import dotenv from 'dotenv'
dotenv.config(); 


const app = express(); 


app.use(express.json()); 


app.listen(process.env.PORT|| 8080, () => {
    console.log(`The port is running on the http://localhost:${process.env.PORT}`)
})