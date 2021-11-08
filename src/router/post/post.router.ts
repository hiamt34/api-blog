import { Express, Router } from 'express';
import { postController } from '../../controller';
import { validate, verifyToken } from '../../middleware';
import { activePostSchema, changeStatusPostSchema, createPostSchema, destroyPostSchema, updatePostSchema } from '../../schema';
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

const PostRouter = (app: Express) => {
    app.use('/posts', route);

    //getAll
    route.get('/', postController.index)

    //getDetail
    route.get('/detail/:_id', postController.show)

    //create
    route.post('/create', verifyToken, validate(createPostSchema), postController.store)

    //Update
    route.put('/update/:_id', verifyToken, validate(updatePostSchema), postController.update)

    //destroy
    route.delete('/destroy/:_id', verifyToken, validate(destroyPostSchema), postController.destroy)

    //Upload image CKEditor
    route.post('/upload', upload.single('upload'), postController.uploadCKEditor)

    //Upload image Dropzone
    route.post('/uploaddropzone', verifyToken, upload.single('upload'), postController.uploadDropzone)

    //active
    route.put('/active/:_id', verifyToken, validate(activePostSchema) , postController.update)

    //changeStatus
    route.put('/changestatus/:_id', verifyToken, validate(changeStatusPostSchema) , postController.update)
};

export default PostRouter;
