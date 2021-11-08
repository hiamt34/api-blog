import mongoose from 'mongoose'

export interface CategoryDocument extends mongoose.Document {
    name: string;
    status: string | 'ROOT';
};