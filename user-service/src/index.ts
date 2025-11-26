import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.ts';
import { connectRabbit } from './rabbitmq';


const app = express();
app.use(express.json());
app.use(cors())

connectRabbit();

const port = process.env.PORT || 3000;


app.use('/users', userRouter)

async function start () {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL!); 
    console.log('MongoDB connected');

    app.listen(port, () => console.log('Server started on port 3000'));
  } catch (err) {
    console.error(err);
  }
};

start();