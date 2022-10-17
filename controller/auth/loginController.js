import Joi from "joi";
import users from '../../models/user.js'
import CustomErrorHandler from "../../services/customErrorHandler.js";
import bcrypt from 'bcrypt';
import JwtServices from '../../services/JwtService.js'

// login ka liya
const loginController = {
    async login(req, res, next) {
        // validation of user login
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9,@]{3,30}$')).required(),
        });
        // login e p ko validate kar rah hai
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return next(error)
        }

        // agger error nahi hai to email verify kar na

        try {
            const user = await users.findOne({ email: req.body.email })
            // agger email nahi hai custom error banyan ha  service ma
            if (!user) return next(CustomErrorHandler.notExist());

            // agger user hai toa compare the password
            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) {
                return next(CustomErrorHandler.notExist());
            }

            // match jo ja ta hai to jwt access token generate kar ga 
            const access_token = JwtServices.sign({ _id: user._id, role: user.role });
            res.json(access_token);
        } catch (error) {
            return next(error)
        }

    }
};

export default loginController;