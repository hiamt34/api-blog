"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var CategorySchema = new mongoose_1.default.Schema({
    name: { type: String, unique: true, required: true },
    status: { type: String, ref: 'Category' }
}, {
    timestamps: true
});
exports.Category = mongoose_1.default.model('Category', CategorySchema);
