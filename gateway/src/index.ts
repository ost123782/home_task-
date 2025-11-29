import dotenv from 'dotenv';
dotenv.config();
import express from "express"
import { createProxyMiddleware } from 'http-proxy-middleware';
import authMiddleware from './middleware/auth.middleware';


const app = express()

const PORT = process.env.PORT;

app.use('/users/public', createProxyMiddleware({
    target: `${process.env.USER_SERVICE_URL}/users/public`,
    changeOrigin: true
}))



app.use('/cars/public', createProxyMiddleware({
    target: `${process.env.CAR_SERVICE_URL}/cars/public`,
    changeOrigin: true
}))

app.use(authMiddleware);

app.use('/users/private', createProxyMiddleware({
    target: `${process.env.USER_SERVICE_URL}/users/private`,
    changeOrigin: true
}))



app.use('/cars/private', createProxyMiddleware({
    target: `${process.env.CAR_SERVICE_URL}/cars/private`,
    changeOrigin: true
}))

async function start () {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
