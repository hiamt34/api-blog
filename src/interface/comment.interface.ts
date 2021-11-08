import mongoose from 'mongoose'

export interface CommentDocument extends mongoose.Document {
    conten: string;
    user: string;
};