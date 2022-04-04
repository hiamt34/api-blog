import mongoose from 'mongoose'

export interface CategoryDocument extends mongoose.Document {
    _id?: string;
    name: string;
    status: string | 'ROOT';
    countPost?: number;
};