import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const TOKEN_SECRET = process.env.TOKEN_SECRET!;
if (!TOKEN_SECRET) throw new Error("TOKEN_SECRET is not set");

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).send('No auth header');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, TOKEN_SECRET) as {
            email: string;
            userId: string;
        };



        (req as any).user = payload; 

        next();
    } catch (err) {
        return res.status(403).send('Invalid token!');
    }
};

export default authMiddleware;
