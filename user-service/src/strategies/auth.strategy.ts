import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN_SECRET!;
if (!TOKEN_SECRET) throw new Error("TOKEN_SECRET is not set");

export function generateAccessToken(email: string, userId: string) {
    return jwt.sign(
        { email, userId },
        TOKEN_SECRET,
        { expiresIn: '10d' }
    );
}