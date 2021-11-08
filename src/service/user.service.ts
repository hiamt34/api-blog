import { User } from '../model';
import { UserDocument } from '../interface';
import { createToken, mailerService } from '../util';
import { PatternService } from './pattern.service';
import { DocumentDefinition, FilterQuery } from 'mongoose';
export class UserService extends PatternService<UserDocument> {

    public checkAndSendMail = async (data: DocumentDefinition<UserDocument>) => {
        try {
            const query = {
                email: data.email as string
            } as FilterQuery<UserDocument>
            const user = await User.findOne(query);

            if (user) {
                return false;
            }

            const option = {
                emailUser: data.email,
                token: createToken(data)
            };

            mailerService(option);
            
            return true;
        } catch (error: any) {
            throw new Error(error);
        }
    };

}

export const userService = new UserService(User);
