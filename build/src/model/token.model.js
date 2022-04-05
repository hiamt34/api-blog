"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var locale_1 = require("yup/lib/locale");
var TokenSchema = new mongoose_1.default.Schema({
    email: { type: locale_1.string, unique: true },
    refreshToken: { type: locale_1.string, unique: true }
}, {
    timestamps: true
});
exports.RefreshToken = mongoose_1.default.model('RefreshToken', TokenSchema);
