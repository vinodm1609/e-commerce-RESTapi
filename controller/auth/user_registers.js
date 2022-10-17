import Joi from "joi"
import CustomErrorHandler from "../../services/customErrorHandler.js";
import User from '../../models/user.js'
import bcrypt from 'bcrypt'
import JwtServices from "../../services/JwtService.js";

const registerController = {
    async register(req, res, next) {
        // logic for register 
        // CHECKLIST
        // validate the request aur joi npm ka use kar rahi hai
        const registerSchema = Joi.object({
            name: Joi.string().min(4).max(20).required(),
            email: Joi.string().email().required(),
            // password kay sa  hona chiya
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9,@]{3,30}$')).required(),
            conform_password: Joi.ref('password'),
            Phone_Number: Joi.number(),
            role: Joi.string()
        })

        // validate the request
        // console.log(req.body);
        // express ka andre jo bhi json data receive kar ta wo by default disable rahai ta ha 
        // use enable kar na pade ta hai ho main file ma ja kar jo in middleware ta hai usa enable kar na pade ta hai
        const { error } = registerSchema.validate(req.body);

        if (error) {
            // middleware  error ko catch  kar lega
            return next(error);
        }
        // check if user is in database
        try {
            const exist = await User.exists({ email: req.body.email })
            if (exist) {
                // custom error handler  baney ga jo service 
                return next(CustomErrorHandler.alreadyExist("this is email already exist"));
            }

        } catch (err) {
            // aye jo ham na default err diya hai wo throw kar ga jp 500
            return next(err);
        }

        const { name, email, password, role } = req.body
        // ager sab sahi hai to password ko save kar ga hash ka formate ma store karga npm bcrypt
        const hashPassword = await bcrypt.hash(password, 10)

        // new user register kar na ka bade us DB ma stor kar na ka liya aur kaha sa aye ga

        const user = new User({
            name,
            email,
            password: hashPassword,
            role

        });
        // db ma save kar ga
        let access_toke;
        try {
            const result = await user.save();
            // save ho na ka bade jwt toke clint ko return kar na hai create token npm i jsonwebtoken 
            //jo services ka ander create kar rahi hai
            access_toke = JwtServices.sign({ _id: result._id, role: result.role })
        } catch (err) {
            return next(err)
        }
        res.json({ access_toke: access_toke });
    }
}


export default registerController