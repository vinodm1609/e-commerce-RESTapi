import { DEBUG_MODE } from '../config/index.js'
import joi from 'joi';
import CustomErrorHandler from '../services/customErrorHandler.js';

// middleware 4 argument  la ta hai 
const errorHandler = (err, req, res, next) => {
    //throw error of clint 

    let statusCode = 500;
    let data = {
        message: 'Internal server error',
        // agar DEBUG MODE true hai to originalError add kar hai tab
        ...(DEBUG_MODE === "true" && { originalError: err.message })

    }

    // aye jo err mila rahai hai wo ValidationError ka instanceof(class) hai ki nahi 
    //ValidationError ki class hame registerController ka error ka joi sa bate chale ga 
    if (err instanceof joi.ValidationError) {
        statusCode = 422,
            data = {
                // original error throw clint 
                message: err.message
            }
    }
    // email already exists to aye error 
    if (err instanceof CustomErrorHandler) {
        statusCode = err.status;
        data = {
            message: err.message
        }
    }

    return res.status(statusCode).json(data)
}



export default errorHandler;