import { Request, Response } from 'express';
import log from '../../logger';
import { IUser, UserDocument } from '../interface';
import { userService } from '../service'
import { PatternController } from './pattern.controller';

class UserController extends PatternController<UserDocument> {

    public store = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const checkAlreadyAccount = await userService.checkAndSendMail(data);

            if (!checkAlreadyAccount) {
                return res.status(409).json({
                    status: false,
                    message: 'email already exist!'
                });
            };

            return res.status(200).json({
                status: true,
                message: 'check your email and active account!'
            });
        } catch (error: any) {
            log.error(error.message);
            return res.status(409).json({
                status: false,
                mes: error.message
            });
        };
    };

    public delete = async (req: Request, res: Response) => {
        try {
            const query = await {
                _id: req.params._id as string
            };

            const update = await { status: false };
            await userService.update(query, update);

            return res.status(200).json({
                status: true,
            });
        } catch (error: any) {
            log.error(error.message);
            return res.status(409).json({
                status: false,
                mes: error.message
            });
        };
    };
}

export const userController = new UserController(userService)
