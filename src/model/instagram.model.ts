import mongoose from 'mongoose';
import { InstagramDocument } from '../interface';

const InstagramSchema = new mongoose.Schema(
    {
        url: { type: String, unique: true },
        status: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
);

export const Instagram = mongoose.model<InstagramDocument>('Instagram', InstagramSchema);
