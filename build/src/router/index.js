"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_router_1 = __importDefault(require("./auth/auth.router"));
var category_router_1 = __importDefault(require("./category/category.router"));
var tag_router_1 = __importDefault(require("./tag/tag.router"));
var user_router_1 = __importDefault(require("./user/user.router"));
var upload_router_1 = __importDefault(require("./upload/upload.router"));
var instagram_router_1 = __importDefault(require("./instagram/instagram.router"));
var post_router_1 = __importDefault(require("./post/post.router"));
var router = function (app) {
    (0, user_router_1.default)(app);
    (0, auth_router_1.default)(app);
    (0, category_router_1.default)(app);
    (0, tag_router_1.default)(app);
    (0, upload_router_1.default)(app);
    (0, instagram_router_1.default)(app);
    (0, post_router_1.default)(app);
};
exports.default = router;
