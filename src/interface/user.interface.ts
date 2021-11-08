import mongoose from 'mongoose'
export interface UserDocument extends  mongoose.Document {
    email: string;
    // name: string;
    // phone: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
};

export interface IUser {
    _id?: string; 
    email: string;
    password: string;
}

