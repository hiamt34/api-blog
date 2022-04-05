"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = __importDefault(require("config"));
var logger_1 = __importDefault(require("../../logger"));
var connect = function () {
    var dbUri = config_1.default.get("dbUri");
    var options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        autoIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };
    return mongoose_1.default
        .connect(dbUri, options)
        .then(function () {
        logger_1.default.info("Database connected");
    })
        .catch(function (error) {
        logger_1.default.error("DB error", error);
        process.exit(1);
    });
};
exports.default = connect;
