"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("../../controller");
var middleware_1 = require("../../middleware");
var schema_1 = require("../../schema");
var route = (0, express_1.Router)();
var UserRouter = function (app) {
    app.use('/users', route);
    //getAll
    route.get('/', middleware_1.verifyToken, controller_1.userController.index);
    //getDetail
    route.get('/detail/:_id', middleware_1.verifyToken, controller_1.userController.show);
    //create
    route.post('/create', (0, middleware_1.validate)(schema_1.createUserSchema), controller_1.userController.store);
    //Update
    route.put('/update/:_id', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.updateUserSchema), controller_1.userController.update);
    //active
    route.put('/active/:_id', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.activeUserSchema), controller_1.userController.update);
    //destroy
    route.delete('/destroy/:_id', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.detailDestroyDeleteUserSchema), controller_1.userController.destroy);
    //delete
    route.delete('/delete/:_id', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.detailDestroyDeleteUserSchema), controller_1.userController.delete);
};
exports.default = UserRouter;
