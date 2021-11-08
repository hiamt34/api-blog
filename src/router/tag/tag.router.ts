import { Express, Router } from 'express';
import { TagController } from '../../controller';
import { validate, verifyToken } from '../../middleware';
import { createTagSchema, destroyTagSchema, updateTagSchema } from '../../schema';
const route = Router();

const TagRouter = (app: Express) => {
    app.use('/tags', route);

    //getAll
    route.get('/', TagController.index)

    //getDetail
    route.get('/detail/:_id', TagController.show)

    //create
    route.post('/create', verifyToken, validate(createTagSchema), TagController.store)

    //Update
    route.put('/update/:_id', verifyToken, validate(updateTagSchema), TagController.update)

    //destroy
    route.delete('/destroy/:_id', verifyToken, validate(destroyTagSchema), TagController.destroy)


};

export default TagRouter;
