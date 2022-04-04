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
exports.AuthService = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("config"));
var lodash_1 = require("lodash");
var model_1 = require("../model");
var logger_1 = __importDefault(require("../../logger"));
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    var _a;
    _a = AuthService;
    AuthService.save = function (token) { return __awaiter(void 0, void 0, void 0, function () {
        var user, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, jsonwebtoken_1.default.verify(token, 'hiamt06')];
                case 1:
                    user = _b.sent();
                    return [2 /*return*/, model_1.User.create(user)];
                case 2:
                    error_1 = _b.sent();
                    throw new Error(error_1.message);
                case 3: return [2 /*return*/];
            }
        });
    }); };
    AuthService.signin = function (userLogin) { return __awaiter(void 0, void 0, void 0, function () {
        var user, isValid, accessToken, refreshToken, error_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, model_1.User.findOne({ email: userLogin.email })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, false];
                    }
                    ;
                    return [4 /*yield*/, user.comparePassword(userLogin.password)];
                case 2:
                    isValid = _b.sent();
                    if (!isValid) {
                        return [2 /*return*/, false];
                    }
                    ;
                    user = (0, lodash_1.pick)(user.toJSON(), 'email', 'status');
                    accessToken = jsonwebtoken_1.default.sign(user, 'hiamt06', { expiresIn: '7d' });
                    refreshToken = jsonwebtoken_1.default.sign(user, 'hiamt06', { expiresIn: '365d' });
                    return [4 /*yield*/, model_1.RefreshToken.updateOne({ email: user.email }, {
                            email: user.email,
                            refreshToken: refreshToken
                        }, { upsert: true })];
                case 3:
                    _b.sent();
                    return [2 /*return*/, {
                            statusCode: 201,
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                            user: user
                        }];
                case 4:
                    error_2 = _b.sent();
                    throw new Error(error_2.message);
                case 5:
                    ;
                    return [2 /*return*/];
            }
        });
    }); };
    AuthService.getToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
                    var authRefreshToken, refreshToken, user, check, accessTokenNew, refreshTokenNew, error_3;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                authRefreshToken = req.header('Authorization');
                                refreshToken = authRefreshToken && authRefreshToken.split(' ')[1];
                                if (!refreshToken)
                                    return [2 /*return*/, resolve(false)];
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 4, , 5]);
                                user = jsonwebtoken_1.default.verify(refreshToken, 'hiamt06');
                                return [4 /*yield*/, model_1.RefreshToken.findOne({ email: user.email, refreshToken: refreshToken })];
                            case 2:
                                check = _b.sent();
                                if (!check)
                                    return [2 /*return*/, resolve(false)];
                                user = (0, lodash_1.pick)(user, 'email', 'status');
                                accessTokenNew = jsonwebtoken_1.default.sign(user, 'hiamt06', { expiresIn: '7d' });
                                refreshTokenNew = jsonwebtoken_1.default.sign(user, 'hiamt06', { expiresIn: '365d' });
                                return [4 /*yield*/, model_1.RefreshToken.updateOne({ email: user.email }, {
                                        email: user.email,
                                        refreshToken: refreshTokenNew
                                    }, { upsert: true })];
                            case 3:
                                _b.sent();
                                return [2 /*return*/, resolve({
                                        accessToken: accessTokenNew,
                                        refreshToken: refreshTokenNew
                                    })];
                            case 4:
                                error_3 = _b.sent();
                                logger_1.default.error(error_3.message);
                                return [2 /*return*/, res.status(200).json({
                                        status: false,
                                        data: {
                                            message: error_3.message,
                                            statusCode: 401
                                        }
                                    })];
                            case 5:
                                ;
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    }); };
    return AuthService;
}());
exports.AuthService = AuthService;
