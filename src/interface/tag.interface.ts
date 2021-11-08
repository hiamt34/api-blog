import mongoose from 'mongoose'

export interface TagDocument extends mongoose.Document {
    name: string;
};