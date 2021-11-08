import mongoose from 'mongoose';
import { string } from 'yup/lib/locale';
import { TokenDocument } from '../interface';

const TokenSchema = new mongoose.Schema(
    {
        email: { type: string, unique: true },
        refreshToken: { type: string, unique: true }
    },
    {
        timestamps: true
    }
);

export const RefreshToken = mongoose.model<TokenDocument>('RefreshToken', TokenSchema);
