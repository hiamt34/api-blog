"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("../../controller");
var middleware_1 = require("../../middleware");
var schema_1 = require("../../schema");
var route = (0, express_1.Router)();
var CategoryRouter = function (app) {
    app.use('/categories', route);
    //getAll
    route.get('/', controller_1.CategoryController.indexV2);
    //getDetail
    route.get('/detail/:_id', controller_1.CategoryController.show);
    //create
    route.post('/create', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.createCategorySchema), controller_1.CategoryController.store);
    //Update
    route.put('/update/:_id', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.updateCategorySchema), controller_1.CategoryController.update);
    //destroy
    route.delete('/destroy/:_id', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.destroyCategorySchema), controller_1.CategoryController.destroy);
    //getAll
    // route.get('/test', CategoryController.test);
};
exports.default = CategoryRouter;
