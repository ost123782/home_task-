import express from 'express';
import mongoose from 'mongoose';
import carRouter from './routes/car.route.ts.js';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;


app.use('/cars', carRouter)

async function start () {
  try {
    await mongoose.connect('mongodb://localhost:27017/test-task-cars'); 
    console.log('MongoDB connected');

    app.listen(3000, () => console.log('Server started on port 3000'));
  } catch (err) {
    console.error(err);
  }
};

start();