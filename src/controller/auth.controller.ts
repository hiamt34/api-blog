import { Request, Response } from 'express';
import log from '../../logger';
import { AuthService } from '../service';
let reqRefreshToken: any = null;

export class AuthController {
    static signup = async (req: Request, res: Response) => {
        try {
            const token = await req.params.token as string;
            const user = await AuthService.save(token);
            return res.status(201).json({
                status: true,
                data: user
            });
        } catch (error: any) {
            log.error(error.message);
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    };

    static signin = async (req: Request, res: Response) => {
        try {
            const user = req.body;
            const data = await AuthService.signin(user);

            if (!data) {
                return res.status(406).json({
                    status: false,
                    message: 'wrong email or password!'
                })
            }

            return res.status(201).json({
                status: true,
                data
            });
        } catch (error: any) {
            log.error(error.message);
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    };

    static getAccessToken = async (req: Request, res: Response) => {
        try {  
            
            reqRefreshToken = reqRefreshToken ? reqRefreshToken : AuthService.getToken(req,res)
            
            const data = await reqRefreshToken

            setTimeout(() => {
                reqRefreshToken = null
            }, 100);
            
            if (!data) {
                return res.status(200).json({
                    status: false,
                    data: {
                        message: 'Unauthorized',
                        statusCode: 401
                    },
                });
            }
            
            return res.status(200).json({
                status: true,
                data
            });
        } catch (error: any) {
            log.error(error.message);
            return res.status(200).json({
                status: false,
                data: {
                    message: error.message,
                    statusCode: 401
                }
            });
        }
    };
}
