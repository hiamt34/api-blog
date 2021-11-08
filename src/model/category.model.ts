import mongoose from 'mongoose';
import { CategoryDocument } from '../interface';

const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, unique: true, required: true },
        status: { type: String, ref: 'Category' }
    },
    {
        timestamps: true
    }
);

export const Category = mongoose.model<CategoryDocument>('Category', CategorySchema);
