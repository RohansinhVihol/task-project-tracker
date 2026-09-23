// import { User } from "../models/user.model.js";
// import { ApiError } from "../utils/apiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from 'jsonwebtoken'
// import { RegisterRequest } from "../controllers/auth.controller.js";

// interface authUser{
//     _id: string,
//     email: string
// }

// export const verifyJWT = asyncHandler(async(req:RegisterRequest, res, next) => {
//     const {token} = req.cookies

//     if(!token){
//         throw new ApiError(400, "Token Not Found")
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as authUser

//     const user = await User.findById(decoded._id).select('-password')

//     if(!user){
//         throw new ApiError(404, "User Not Found")
//     }

//     req.body.user = user
//     next()

// })