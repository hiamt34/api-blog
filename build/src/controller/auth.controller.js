"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var logger_1 = __importDefault(require("../../logger"));
var service_1 = require("../service");
var reqRefreshToken = null;
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    var _a;
    _a = AuthController;
    AuthController.signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var token, user, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, req.params.token];
                case 1:
                    token = _b.sent();
                    return [4 /*yield*/, service_1.AuthService.save(token)];
                case 2:
                    user = _b.sent();
                    return [2 /*return*/, res.status(201).json({
                            status: true,
                            data: user
                        })];
                case 3:
                    error_1 = _b.sent();
                    logger_1.default.error(error_1.message);
                    return [2 /*return*/, res.status(500).json({
                            status: false,
                            message: error_1.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    AuthController.signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, data, error_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    user = req.body;
                    return [4 /*yield*/, service_1.AuthService.signin(user)];
                case 1:
                    data = _b.sent();
                    if (!data) {
                        return [2 /*return*/, res.status(406).json({
                                status: false,
                                message: 'wrong email or password!'
                            })];
                    }
                    return [2 /*return*/, res.status(201).json({
                            status: true,
                            data: data
                        })];
                case 2:
                    error_2 = _b.sent();
                    logger_1.default.error(error_2.message);
                    return [2 /*return*/, res.status(500).json({
                            status: false,
                            message: error_2.message
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    AuthController.getAccessToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    reqRefreshToken = reqRefreshToken ? reqRefreshToken : service_1.AuthService.getToken(req, res);
                    return [4 /*yield*/, reqRefreshToken];
                case 1:
                    data = _b.sent();
                    setTimeout(function () {
                        reqRefreshToken = null;
                    }, 100);
                    if (!data) {
                        return [2 /*return*/, res.status(200).json({
                                status: false,
                                data: {
                                    message: 'Unauthorized',
                                    statusCode: 401
                                },
                            })];
                    }
                    return [2 /*return*/, res.status(200).json({
                            status: true,
                            data: data
                        })];
                case 2:
                    error_3 = _b.sent();
                    logger_1.default.error(error_3.message);
                    return [2 /*return*/, res.status(200).json({
                            status: false,
                            data: {
                                message: error_3.message,
                                statusCode: 401
                            }
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return AuthController;
}());
exports.AuthController = AuthController;
