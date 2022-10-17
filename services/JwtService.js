import { JWT_SECRET } from '../config/index.js';
import jwt from 'jsonwebtoken'


class JwtServices {
    // sign ka matlab token ko create kar na
    static sign(payload, expiry = "800s", secret = JWT_SECRET) {
        return jwt.sign(payload, secret, { expiresIn: expiry })
    }


    // aye token verify kar ga get me ka mid ma jo token aa rah hai 
    static async verify(token, secret = JWT_SECRET) {
        return jwt.verify(token, secret)
    }
}

export default JwtServices;


