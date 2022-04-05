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
var InstagramRouter = function (app) {
    app.use('/instagrams', route);
    //getAll
    route.get('/', controller_1.instagramController.index);
    //getDetail
    route.get('/detail/:_id', controller_1.instagramController.show);
    //create
    route.post('/upload/create', middleware_1.verifyToken, upload.single('file'), controller_1.instagramController.store);
    //Update
    route.put('/active/:_id', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.activeInstagramSchema), controller_1.instagramController.update);
    //destroy
    route.delete('/destroy/:_id', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.destroyInstagramSchema), controller_1.instagramController.destroy);
};
exports.default = InstagramRouter;
