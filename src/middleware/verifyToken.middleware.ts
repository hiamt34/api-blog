import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import log from '../../logger';
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authAccessToken = req.header('Authorization');
    const accessToken = authAccessToken && authAccessToken.split(' ')[1];
    
    if (!accessToken) return res.status(200).json({
        status: false,
        data: {
            message: 'Unauthorized',
            statusCode: 401
        }
    });

    try {
        const user = jwt.verify(accessToken, config.get('privateKey'));        
        // @ts-ignore
        req.user = user;
        next();
    } catch (error: any) {
        log.error(error.message);
        return res.status(200).json({
            satus: false,
            data: {
                message: error.message,
                statusCode: 403
            }
        });
    }
};
