"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("../../controller");
var middleware_1 = require("../../middleware");
var schema_1 = require("../../schema");
var route = (0, express_1.Router)();
var TagRouter = function (app) {
    app.use('/tags', route);
    //getAll
    route.get('/', controller_1.TagController.index);
    //getDetail
    route.get('/detail/:_id', controller_1.TagController.show);
    //create
    route.post('/create', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.createTagSchema), controller_1.TagController.store);
    //Update
    route.put('/update/:_id', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.updateTagSchema), controller_1.TagController.update);
    //destroy
    route.delete('/destroy/:_id', middleware_1.verifyToken, (0, middleware_1.validate)(schema_1.destroyTagSchema), controller_1.TagController.destroy);
};
exports.default = TagRouter;
