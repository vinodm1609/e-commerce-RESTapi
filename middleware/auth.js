import CustomErrorHandler from "../services/customErrorHandler.js";
import JwtServices from "../services/JwtService.js";


const auth = async (req, res, next) => {
    // header ko get kar na ka liya 
    let authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader) {
        // header nahi mila
        return next(CustomErrorHandler.unAuthorize())
    }
    //   agger hai to token ko extract kar na hai
    const token = authHeader.split(' ')[1]// split kar na ka bade Berar 0 index aur token1 index. hame 1 index extract kar rah hai
    // console.log(token);




    try {
        // verify kar ga ki token galata toa nahi hai 
        const { _id, role } = await JwtServices.verify(token);

        const user = {
            _id,
            role
        }
        // curr req obj ka  opper ek user name property create kar jsa user ki value assign kar da ga
        req.user = user;
        next()
    } catch (error) {
        return next(CustomErrorHandler.unAuthorize());
    };
};




export default auth;