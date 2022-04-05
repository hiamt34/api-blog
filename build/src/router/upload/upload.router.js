"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var upload_comtroller_1 = require("../../controller/upload.comtroller");
var multer_1 = __importDefault(require("multer"));
var middleware_1 = require("../../middleware");
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
var uploadRouter = function (app) {
    app.use('/upload', route);
    route.post('/destroy', middleware_1.verifyToken, upload_comtroller_1.uploadController.destroyImg);
};
exports.default = uploadRouter;
