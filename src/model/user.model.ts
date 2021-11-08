import mongoose from 'mongoose';
import { UserDocument } from '../interface';
import bcrypt from 'bcrypt';
import config from 'config';

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true, required: true, trim: true },
        // name: { type: String, unique: true, required: true, index: true },
        password: { type: String, required: true },
        // phone: { type: String, required: true, unique: true },
        status: { type: Boolean, default: false }
    },
    { timestamps: true }
);

//login
UserSchema.methods.comparePassword = async function (candidatePassword: string) { //do not arrow functions

    const user = await this as unknown as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch(e => false)
}

// hash password when change pass or signin
UserSchema.pre('save', async function (next) {
    const user = await this as unknown as UserDocument;

    // Only run this function if password was moddified (not on other update functions)
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(config.get('genSaltBcrypt'));

    const hashPassword = await bcrypt.hashSync(user.password, salt);

    user.password = hashPassword;
});

export const User = mongoose.model<UserDocument>('User', UserSchema);
