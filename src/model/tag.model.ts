import mongoose from 'mongoose';
import { TagDocument } from '../interface';

const TagSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true, required: true },
    },
    {
        timestamps: true
    }
);

export const Tag = mongoose.model<TagDocument>('Tag', TagSchema);