import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.ts';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;


app.use('/users', userRouter)

async function start () {
  try {
    await mongoose.connect('mongodb://localhost:27017/test-task-users'); 
    console.log('MongoDB connected');

    app.listen(3000, () => console.log('Server started on port 3000'));
  } catch (err) {
    console.error(err);
  }
};

start();