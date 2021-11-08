import { Express, Router } from 'express';
import { AuthController } from '../../controller';
import { validate } from '../../middleware';
import { loginUserSchema } from '../../schema/user.schema';
const route = Router();

const AuthRouter = (app: Express) => {
    app.use('/auth', route);

    route.get('/signup/:token', AuthController.signup);

    route.post('/signin', validate(loginUserSchema), AuthController.signin);

    route.get('/getaccesstoken', AuthController.getAccessToken);
    
};

export default AuthRouter;
