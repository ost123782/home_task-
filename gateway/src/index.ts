import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import { createProxyMiddleware } from 'http-proxy-middleware';
import authMiddleware from './middleware/auth.middleware';

const app = express();
const GATEWAY_PORT = process.env.GATEWAY_PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id']
}));

app.use('/users/public', createProxyMiddleware({
    target: `${process.env.USER_SERVICE_URL}/users/public`,
    changeOrigin: true
}));

app.use('/cars/public', createProxyMiddleware({
    target: `${process.env.CAR_SERVICE_URL}/cars/public`,
    changeOrigin: true
}));

app.use(authMiddleware);

app.use((req, res, next) => {
    if ((req as any).user && (req as any).user.userId) {
        req.headers['x-user-id'] = (req as any).user.userId;
    }
    next();
});

app.use('/users/private', createProxyMiddleware({
    target: `${process.env.USER_SERVICE_URL}/users/private`,
    changeOrigin: true
}));

app.use('/cars/private', createProxyMiddleware({
    target: `${process.env.CAR_SERVICE_URL}/cars/private`,
    changeOrigin: true
}));

async function start() {
    try {
        app.listen(GATEWAY_PORT, () => console.log(`Gateway Server started on port ${GATEWAY_PORT}`));
    } catch (err) {
        console.error(err);
    }
};

start();