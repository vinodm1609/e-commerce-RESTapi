
import mongoose from "mongoose";

// data base ma aye user ka detail rakh na hai jo register
const Schema = mongoose.Schema;
// hamer Schema kasai bane chiya db ma uska formate hai
const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    phone_Number: { type: String, require: true, unique: true },
    role: { type: String, }
}, { timestamps: true })

// model ko database ma table bane ka liya
export default mongoose.model('User', userSchema, 'users');