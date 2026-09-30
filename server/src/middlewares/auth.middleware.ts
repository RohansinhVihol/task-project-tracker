import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

interface authUser{
    _id: string,
    email: string
}

export const verifyJWT = asyncHandler(async(req, res, next) => {
try {
        const {token} = req.cookies
    
        if(!token){
            throw new ApiError(400, "You need to login first")
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as authUser
    
        const user = await User.findById(decoded._id).select('-password')
    
        if(!user){
            throw new ApiError(404, "User Not Found")
        }
    
        req.user = user
        next()
        
} catch (error) {
    
    next(error)
}

})