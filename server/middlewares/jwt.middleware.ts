import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const key = fs.readFileSync(path.resolve(__dirname, '..', './token/.key'), 'utf8');

export const jwtMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'];

    jwt.verify(token, key, (err, payload) => {
        if (!payload || err) {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }

        return next();
    });
};