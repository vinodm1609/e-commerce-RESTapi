

class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }

    // check kar ga ki agra email exist hai to aye error
    static alreadyExist(message) {
        return new CustomErrorHandler(409, message)
    }
    // email agar nahi hai to 
    static notExist(message = "Username and password is not Exist!") {
        return new CustomErrorHandler(401, message)
    }
    static unAuthorize(message = "Unauthorize user ") {
        return new CustomErrorHandler(401, message)
    }

    static notFound(message = " user not found ") {
        return new CustomErrorHandler(404, message)
    }
}

export default CustomErrorHandler;