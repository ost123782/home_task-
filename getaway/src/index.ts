import dotenv from 'dotenv';
dotenv.config();
import express from "express"
import { createProxyMiddleware } from 'http-proxy-middleware';


const app = express()

const PORT = process.env.PORT;

app.use('/users', createProxyMiddleware({
    target: `${process.env.USER_SERVICE_URL}/users`,
    changeOrigin: true
}))



app.use('/cars', createProxyMiddleware({
    target: `${process.env.CAR_SERVICE_URL}/cars`,
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
