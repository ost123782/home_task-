import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import carPrivateRouter from './routes/car.private.route';
import carPublicRouter from './routes/car.public.route';

import { errorHandler } from './error.handler';
import { initRabbitMQSubscribers } from './rabbitmq';

const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.CAR_SERVICE_PORT!;

app.use('/cars/public', carPublicRouter)

app.use('/cars/private', carPrivateRouter)

app.use(errorHandler);


async function start () {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL!); 
    console.log('MongoDB connected');

    app.listen(port, async () => {
      console.log(`Server started on port ${port}`)
      
      await initRabbitMQSubscribers();
    });
  } catch (err) {
    console.error(err);
  }
};

start();