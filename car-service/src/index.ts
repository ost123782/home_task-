import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import carPrivateRouter from './routes/car.private.route';
import carPublicRouter from './routes/car.public.route';
import { connectToRabbitMQ } from './rabbitmq';

const app = express();
app.use(express.json());

const port = process.env.PORT!;

connectToRabbitMQ();

app.use('/cars/private', carPrivateRouter)
app.use('/cars/public', carPublicRouter)


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