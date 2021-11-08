import mongoose from 'mongoose';
import { PostDocument } from '../interface';

const PostSchema = new mongoose.Schema(
    {
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
    },
    {
        timestamps: true
    }
);

export const Post = mongoose.model<PostDocument>('Post', PostSchema);
