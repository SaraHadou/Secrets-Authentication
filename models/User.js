import mongoose from 'mongoose';
import encrypt from "mongoose-encryption";
import dotenv from 'dotenv';

dotenv.config();

const userSchema = mongoose.Schema({
  email: String,
  password: String
});

userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

export default mongoose.model('User', userSchema);