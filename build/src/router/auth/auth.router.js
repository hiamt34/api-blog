"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("../../controller");
var middleware_1 = require("../../middleware");
var user_schema_1 = require("../../schema/user.schema");
var route = (0, express_1.Router)();
var AuthRouter = function (app) {
    app.use('/auth', route);
    route.get('/signup/:token', controller_1.AuthController.signup);
    route.post('/signin', (0, middleware_1.validate)(user_schema_1.loginUserSchema), controller_1.AuthController.signin);
    route.get('/getaccesstoken', controller_1.AuthController.getAccessToken);
};
exports.default = AuthRouter;
