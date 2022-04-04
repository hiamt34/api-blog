"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var TagSchema = new mongoose_1.default.Schema({
    name: { type: String, unique: true, required: true },
}, {
    timestamps: true
});
exports.Tag = mongoose_1.default.model('Tag', TagSchema);
