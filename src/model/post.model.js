"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var PostSchema = new mongoose_1.default.Schema({
    title: {
        type: String, unique: true, required: true
    },
    description: {
        type: String, required: true
    },
    tags: {
        type: [
            {
                type: String,
                ref: 'Tag'
            }
        ],
        required: true,
    },
    category: {
        type: String, required: true, ref: 'Category'
    },
    imgs: {
        type: [], required: true,
    },
    video: {
        type: String
    },
    comment: {
        type: []
    },
    active: {
        type: Boolean, default: true
    },
    status: {
        type: String, enum: ['hot', 'normal'], default: 'normal'
    },
}, {
    timestamps: true
});
exports.Post = mongoose_1.default.model('Post', PostSchema);
