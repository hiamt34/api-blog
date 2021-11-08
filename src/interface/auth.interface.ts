import mongoose from 'mongoose';
export interface UserLogin {
    email: string;
    password: string;
};

export interface TokenDocument extends  mongoose.Document {
    email: string;
    refreshToken: string;
    password: string;
};