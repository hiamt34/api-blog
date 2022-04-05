"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instagram = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var InstagramSchema = new mongoose_1.default.Schema({
    url: { type: String, unique: true },
    status: { type: Boolean, default: true }
}, {
    timestamps: true
});
exports.Instagram = mongoose_1.default.model('Instagram', InstagramSchema);
