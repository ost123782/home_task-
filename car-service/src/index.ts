import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import carRouter from './routes/car.route.ts';
import { connectToRabbitMQ } from './rabbitmq';

const app = express();
app.use(express.json());

const port = process.env.PORT!;

connectToRabbitMQ();

app.use('/cars', carRouter)

async function start () {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL!); 
    console.log('MongoDB connected');

    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (err) {
    console.error(err);
  }
};

start();