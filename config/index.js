// import from .env

import dotenv from "dotenv"
dotenv.config()

// obj ko destructure kar hai
export const {
    PORT,
    DEBUG_MODE,
    DB_URL,
    JWT_SECRET,
    REFRESH_SECRET

} = process.env

