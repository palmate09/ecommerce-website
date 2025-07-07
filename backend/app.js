import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/googleAuthRoute.js'
import userRouter from './routes/userRoutes.js'
import addressRouter from './routes/addressRoute.js'
import adminRouter from './routes/adminRoute.js'
import productRouter from './routes/productRoute.js'
dotenv.config(); 


const app = express(); 


app.use(express.json()); 
app.use(`/api/v1`, authRouter); 
app.use(`/api/v1`, userRouter);
app.use(`/api/v1`, addressRouter); 
app.use(`/api/v1`, adminRouter); 
app.use(`/api/v1`, productRouter); 

app.listen( process.env.PORT|| 8080);