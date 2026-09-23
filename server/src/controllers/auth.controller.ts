// import {asyncHandler} from '../utils/asyncHandler.js'
// import {ApiError} from '../utils/apiError.js'
// import {ApiResponse} from '../utils/apiResponse.js'
// import {User} from '../models/user.model.js'
// import {type Request , type Response} from 'express'
// import mongoose, { isValidObjectId } from 'mongoose'
// import { console } from 'inspector'

// const generateAuthToken = async(userId:mongoose.Types.ObjectId) => {

//    try {
//         if(!isValidObjectId(userId)){
//             throw new ApiError(400, "Invalid User ID")
//         }
    
//         const user = await User.findById(userId)
    
//         if(!user){
//             throw new ApiError(404, "User Not Found")
//         }
    
//         const token = user.generateJwtToken()
    
//         return token
//     } 

//    catch (error) {
//         console.log(error)

//         if(error instanceof ApiError){
//             throw error
//         }

//         throw new ApiError(500, "Internal Server Error")
//    }
// }


// // Request<
// //   Params,
// //   ResBody,
// //   ReqBody,
// //   ReqQuery
// // >
// // export type RegisterRequest = Request<
// //   {}, 
// //   {}, 
// //   {
// //     name: string;
// //     user?: string;
// //     email: string;
// //     password: string;
// //   }
// // >;

// // Custom complete Request type
// export type RegisterRequest = {
//   params: {
//     id: string;
//   };

//   query: {
//     role?: string;
//   };

//   body: {
//     name: string;
//     email: string;
//     password: string;
//   };
// };


// type SafeUser = {
//     _id: mongoose.Types.ObjectId
//     name: string;
//     email: string;
// };

// //for cookies
// const options = {
//     httpOnly : true,
//     secure : true
// }

// const register = asyncHandler(async(req:RegisterRequest,res: Response<ApiResponse<SafeUser | null>>) => {
//     const {name , email , password} = req.body

//     if(!name || !email){
//         throw new ApiError(400 , "ALl Fields are required")
//     }

//     if(password.length < 8 ){
//         throw new ApiError(400, "Passoword must be atleast 8 character")
//     }

//     const user = await User.create({
//         name : name.trim(),
//         email,
//         password
//     })

//     const token = await generateAuthToken(user._id)

//     const safeUser = await User.findById(user._id).select("-password")

//     return res
//     .status(201)
//     .cookie("token",token,options)
//     .json(new ApiResponse(201, safeUser, "User Register Successfully" ))
// })


// type loginRequest = Request<
//     {},
//     {},
//     {
//         email : string,
//         password : string
//     }
// >

// const login = asyncHandler(async(req: loginRequest,res: Response<ApiResponse<SafeUser | null>>) => {
//     const {email , password} = req.body

//     if(!email || !password){
//         throw new ApiError(400,"All Fields are Required")
//     }

//     const user = await User.findOne({email})

//     if(!user){
//         throw new ApiError(404, "User Not Found")
//     }

//     const comparePassword = await 
//     user.isPasswordCorrect(password)

//     if(!comparePassword){
//         throw new ApiError(400, "Incorrect Password")
//     }

//     const token = await generateAuthToken(user._id)

//     return res
//     .status(200)
//     .cookie("token",token,options)
//     .json(
//         new ApiResponse(200,null, "User Login Successfully")
//     )
// })

// const logout = asyncHandler(async(req,res:Response<ApiResponse<null>>) => {

//     res.clearCookie("token",options).status(200).json(
//         new ApiResponse(200 ,null, "User Logged out")
//     )
// })

// // const authUser = asyncHandler(async(req,res:Response<ApiResponse<SafeUser|null>>) => {
// //     return res.status(200).json(
// //         new ApiResponse(200,req.user,"Current User Found Successfully")
// //     )
// // })  