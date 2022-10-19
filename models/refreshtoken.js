
import mongoose from "mongoose";

const schema = mongoose.Schema;

const refreshTokenSchema = new schema({
    token: { type: String, require: true, unique: true }

}, { timestamps: false })

export default mongoose.model("RefreshT", refreshTokenSchema, "refreshToken")