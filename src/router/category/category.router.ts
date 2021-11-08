import { Express, Router } from 'express';
import { CategoryController } from '../../controller';
import { validate, verifyToken } from '../../middleware';
import { createCategorySchema, destroyCategorySchema, updateCategorySchema } from '../../schema';
const route = Router();

const CategoryRouter = (app: Express) => {
    app.use('/categories', route);

    //getAll
    route.get('/', CategoryController.index);

    //getDetail
    route.get('/detail/:_id', CategoryController.show);

    //create
    route.post('/create', verifyToken, validate(createCategorySchema), CategoryController.store);

    //Update
    route.put('/update/:_id', verifyToken, validate(updateCategorySchema), CategoryController.update);

    //destroy
    route.delete('/destroy/:_id', verifyToken, validate(destroyCategorySchema), CategoryController.destroy);


};

export default CategoryRouter;
