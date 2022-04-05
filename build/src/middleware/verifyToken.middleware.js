"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("config"));
var logger_1 = __importDefault(require("../../logger"));
var verifyToken = function (req, res, next) {
    var authAccessToken = req.header('Authorization');
    var accessToken = authAccessToken && authAccessToken.split(' ')[1];
    if (!accessToken)
        return res.status(200).json({
            status: false,
            data: {
                message: 'Unauthorized',
                statusCode: 401
            }
        });
    try {
        var user = jsonwebtoken_1.default.verify(accessToken, config_1.default.get('privateKey'));
        // @ts-ignore
        req.user = user;
        next();
    }
    catch (error) {
        logger_1.default.error(error.message);
        return res.status(200).json({
            satus: false,
            data: {
                message: error.message,
                statusCode: 403
            }
        });
    }
};
exports.verifyToken = verifyToken;
