import { Express, Router } from 'express';
import { uploadController } from '../../controller/upload.comtroller';
import multer from "multer";
import { verifyToken } from '../../middleware';

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

const uploadRouter = (app: Express) => {
    app.use('/upload', route);

    route.post('/destroy', verifyToken, uploadController.destroyImg)
}

export default uploadRouter;
