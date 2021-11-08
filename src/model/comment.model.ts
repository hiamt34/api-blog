import mongoose from 'mongoose';
import { CommentDocument } from '../interface';

const CommentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

export const Comment = mongoose.model<CommentDocument>('Comment', CommentSchema);