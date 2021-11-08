import jwt from 'jsonwebtoken'
import config from 'config';
import { pick } from 'lodash';
import { RefreshToken, User } from '../model';
import { UserDocument, UserLogin } from '../interface';
import log from '../../logger';
import { Request, Response } from 'express';
export class AuthService {

    static save = async (token: string) => {
        try {
            const user = await jwt.verify(token, config.get('privateKey'));
            return User.create(user);
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    static signin = async (userLogin: UserLogin) => {
        try {
            let user = await User.findOne({ email: userLogin.email });

            if (!user) {
                return false;
            };

            const isValid = await user.comparePassword(userLogin.password);

            if (!isValid) {
                return false;
            };

            user = pick(user.toJSON(), 'email', 'status') as UserDocument

            const accessToken = jwt.sign(user, config.get('privateKey'), { expiresIn: config.get('accessTokenLife') });

            const refreshToken = jwt.sign(user, config.get('privateKey'), { expiresIn: config.get('refreshTokenLife') });

            await RefreshToken.updateOne({ email: user.email }, {
                email: user.email,
                refreshToken
            }, { upsert: true });

            return {
                statusCode: 201,
                accessToken,
                refreshToken,
                user
            };
        } catch (error: any) {
            throw new Error(error.message);
        };

    };

    static getToken = async (req: Request, res: Response) => {

        return new Promise(async (resolve) => {

            const authRefreshToken = req.header('Authorization');
            const refreshToken = authRefreshToken && authRefreshToken.split(' ')[1];

            if (!refreshToken) return resolve(false);

            try {

                let user = jwt.verify(refreshToken, config.get('privateKey')) as UserDocument;
                const check = await RefreshToken.findOne({ email: user.email, refreshToken });

                if (!check) return resolve(false);

                user = pick(user, 'email', 'status') as UserDocument;

                const accessTokenNew = jwt.sign(user, config.get('privateKey'), { expiresIn: config.get('accessTokenLife') });

                const refreshTokenNew = jwt.sign(user, config.get('privateKey'), { expiresIn: config.get('refreshTokenLife') });

                await RefreshToken.updateOne({ email: user.email }, {
                    email: user.email,
                    refreshToken: refreshTokenNew
                }, { upsert: true });

                return resolve({
                    accessToken: accessTokenNew,
                    refreshToken: refreshTokenNew
                });

            } catch (error: any) {
                log.error(error.message);
                return res.status(200).json({ // 401 or 403????
                    status: false,
                    data: {
                        message: error.message,
                        statusCode: 401
                    }
                });
            };

        });

    };

}
