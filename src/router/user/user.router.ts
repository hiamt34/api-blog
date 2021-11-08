import { Express, Router } from 'express';
import { userController } from '../../controller';
import { validate, verifyToken } from '../../middleware';
import { activeUserSchema, createUserSchema, detailDestroyDeleteUserSchema, updateUserSchema } from '../../schema';
const route = Router();

const UserRouter = (app: Express) => {
    app.use('/users', route);

    //getAll
    route.get('/', verifyToken, userController.index) 

    //getDetail
    route.get('/detail/:_id', verifyToken, userController.show) 

    //create
    route.post('/create', validate(createUserSchema), userController.store)

    //Update
    route.put('/update/:_id', verifyToken, validate(updateUserSchema), userController.update) 

    //active
    route.put('/active/:_id', verifyToken, validate(activeUserSchema), userController.update) 

    //destroy
    route.delete('/destroy/:_id', verifyToken, validate(detailDestroyDeleteUserSchema), userController.destroy) 

    //delete
    route.delete('/delete/:_id', verifyToken, validate(detailDestroyDeleteUserSchema), userController.delete)  

};

export default UserRouter;
