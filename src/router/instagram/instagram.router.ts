import { Express, Router } from 'express';
import { instagramController } from '../../controller';
import { validate, verifyToken } from '../../middleware';
import { destroyInstagramSchema, activeInstagramSchema } from '../../schema';
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './access/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage
})

const route = Router();

const InstagramRouter = (app: Express) => {
    app.use('/instagrams', route);

    //getAll
    route.get('/', instagramController.index)

    //getDetail
    route.get('/detail/:_id', instagramController.show)

    //create
    route.post('/upload/create', verifyToken, upload.single('file'), instagramController.store)

    //Update
    route.put('/active/:_id', verifyToken, validate(activeInstagramSchema), instagramController.update)

    //destroy
    route.delete('/destroy/:_id', verifyToken, validate(destroyInstagramSchema), instagramController.destroy)


};

export default InstagramRouter;
