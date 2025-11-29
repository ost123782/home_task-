import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userPrivateRouter from './routes/user.private.route';
import userPublicRouter from './routes/user.public.route';
import { connectRabbit } from './rabbitmq';
import { errorHandler } from './error.handler';


const app = express();
app.use(express.json());
app.use(cors())

connectRabbit();

const port = process.env.PORT || 3000;
  
app.use('/users/public', userPublicRouter);
app.use('/users/private', userPrivateRouter);

app.use(errorHandler);

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