import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/googleAuthRoute.js'
import userRouter from './routes/userRoutes.js'
dotenv.config(); 


const app = express(); 


app.use(express.json()); 
app.use(`/api/v1`, authRouter); 
app.use(`/api/v1`, userRouter);


app.listen( process.env.PORT|| 8080);