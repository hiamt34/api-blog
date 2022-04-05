"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
var pattern_service_1 = require("./pattern.service");
var model_1 = require("../model");
var PostService = /** @class */ (function (_super) {
    __extends(PostService, _super);
    function PostService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getAllAndPaginate = function (_a, _b) {
            var limit = _a.limit, page = _a.page;
            var title = _b.title, tags = _b.tags, category = _b.category, status = _b.status;
            return __awaiter(_this, void 0, void 0, function () {
                var query, count, payload, error_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 3, , 4]);
                            query = {};
                            if (title) {
                                query = __assign(__assign({}, query), { title: title });
                            }
                            if (category) {
                                query = __assign(__assign({}, query), { category: category });
                            }
                            if (tags) {
                                query = __assign(__assign({}, query), { tags: tags });
                            }
                            if (status) {
                                query = __assign(__assign({}, query), { status: status });
                            }
                            return [4 /*yield*/, this.model.countDocuments(query)];
                        case 1:
                            count = _c.sent();
                            return [4 /*yield*/, this.model.find(query)
                                    .sort({ createdAt: -1 })
                                    .limit(limit)
                                    .skip(limit * (page - 1))
                                    .populate('category')
                                    .populate('tags', 'name')];
                        case 2:
                            payload = _c.sent();
                            return [2 /*return*/, {
                                    payload: payload,
                                    meta: {
                                        perPage: limit,
                                        total: count,
                                        currentPage: page,
                                    }
                                }];
                        case 3:
                            error_1 = _c.sent();
                            throw new Error(error_1);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        _this.getDetail = function (query) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.model.findOne(query)
                            .populate('category')
                            .populate('tags', 'name')];
                }
                catch (error) {
                    throw new Error(error);
                }
                return [2 /*return*/];
            });
        }); };
        _this.update = function (query, update, option) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.model.updateOne(query, update, option)
                            .populate('category')
                            .populate('tags', 'name')];
                }
                catch (error) {
                    throw new Error(error);
                }
                return [2 /*return*/];
            });
        }); };
        return _this;
    }
    return PostService;
}(pattern_service_1.PatternService));
exports.postService = new PostService(model_1.Post);
