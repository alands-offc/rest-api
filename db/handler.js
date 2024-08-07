import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    apikey: { type: String, required: true },
    admin: { type: Boolean, default: false },
    premium: { type: Boolean, default: false },
    limit: { type: Number, default: 400 },
    daily: { type: Number, default: 0 },
    weekly: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, required: false }
});

const User = mongoose.model('User', userSchema);

export default User;
