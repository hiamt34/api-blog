import nodemailer from 'nodemailer';
import config from 'config';
import log from '../../logger';
import jwt from 'jsonwebtoken';
import { IUser } from '../interface';
interface Option {
    emailUser: string,
    token: string
}; 
export const mailerService = ({ emailUser, token }: Option): void => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.get('auth.user'),
            pass: config.get('auth.pass')
        }
    });
    const mailOptions = {
        from: config.get('auth.user') as string,
        to: emailUser,
        subject: 'Active account',
        html: `<h1><a href="http://${config.get('host')}:${config.get('port')}/auth/signin/${token}">Click to active account</a></h1>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            log.error(error);
        }
        log.info(`Email sent ${emailUser}: ` + info.response);
    })
};

export const createToken = (dataSignin: IUser): string => {
    return jwt.sign(dataSignin, config.get('privateKey'));
};
