import mongoose from 'mongoose'

export interface InstagramDocument extends mongoose.Document {
    id?: string;
    url: string;
    status?: Boolean;
};
