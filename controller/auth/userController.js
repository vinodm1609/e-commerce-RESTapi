/** @format */

import users from "../../models/user.js";
import CustomErrorHandler from "../../services/customErrorHandler.js";

const userController = {
    async me(req, res, next) {
        try {
            // req.user._id ko get kar na ka liya middleware sa aye ga jo ma mid. folder ma auth.js
            const user = await users.findOne({ _id: req.user._id });
            console.log(user);

            // user nahi mila ta hai toa
            if (!user) {
                return next(CustomErrorHandler.notFound());
            }

            //agger hai
            res.json(user);
        } catch (err) {
            return next(err);
        }
    },
};

export default userController;
