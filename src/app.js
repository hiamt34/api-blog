"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("config"));
var logger_1 = __importDefault(require("../logger"));
var connect_1 = __importDefault(require("./db/connect"));
var router_1 = __importDefault(require("./router"));
var cors_1 = __importDefault(require("cors"));
require("dotenv/config");
var port = process.env.PORT || 1998;
var host = process.env.HOST;
var allowedOrigins = ['http://localhost:3000', 'http://localhost:1998', 'http://localhost:8080'];
var options = {
    origin: allowedOrigins
};
var app = (0, express_1.default)();
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/access', express_1.default.static('access'));
app.listen(port, host, function () {
    logger_1.default.info("Server listing at http://" + host + ":" + port);
    (0, connect_1.default)();
    (0, router_1.default)(app);
});
