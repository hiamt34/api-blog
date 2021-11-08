import mongoose from 'mongoose'

export interface PostDocument extends mongoose.Document {
    title: string;
    description: string;
    tag: string;
    category: string;
    coment: string[];
    imgs: string[];
    video: string;
    active: boolean;
    status: 'hot' | 'normal';
};