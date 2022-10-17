import express from "express"
const router = express.Router()
import registerController from "../controller/auth/user_registers.js";
import loginController from "../controller/auth/loginController.js";
import userController from '../controller/auth/userController.js'
import auth from "../middleware/auth.js";

// user ko register kar ka liya 
// controller ma auth folder ka andre  logic likha  kar ka route ma reference diya hai
router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/me', auth, userController.me);

export default router; 