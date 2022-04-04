"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("../../controller");
var middleware_1 = require("../../middleware");
var schema_1 = require("../../schema");
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './access/upload');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
var upload = (0, multer_1.default)({
    storage: storage
});
var route = (0, express_1.Router)();
var PostRouter = function (app) {
    app.use('/posts', route);
    //getAll
    route.get('/', controller_1.postController.index);
    //getDetail
    route.get('/detail/:_id', controller_1.postController.show);
    //create
    route.post('/create', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.createPostSchema), controller_1.postController.store);
    //Update
    route.put('/update/:_id', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.updatePostSchema), controller_1.postController.update);
    //destroy
    route.delete('/destroy/:_id', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.destroyPostSchema), controller_1.postController.destroy);
    //Upload image CKEditor
    route.post('/upload', upload.single('upload'), controller_1.postController.uploadCKEditor);
    //Upload image Dropzone
    route.post('/uploaddropzone', middleware_1.verifyToken, upload.single('upload'), controller_1.postController.uploadDropzone);
    //active
    route.put('/active/:_id', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.activePostSchema), controller_1.postController.update);
    //changeStatus
    route.put('/changestatus/:_id', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.changeStatusPostSchema), controller_1.postController.update);
};
exports.default = PostRouter;
