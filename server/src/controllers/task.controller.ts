import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/apiError.js'
import {ApiResponse} from '../utils/apiResponse.js'
import { Task } from '../models/Task.model.js'
import mongoose, { isValidObjectId, Schema } from 'mongoose'
import {type Request , type Response} from 'express'
import { createTaskSchema, deleteTaskParamsSchema, getSingleTaskParamsSchema, updateTaskParamsSchema, updateTaskSchema } from '../zod-validator/task.validator.js'
import { User } from '../models/user.model.js'



//create task , get all task , update task , delete task 
type createTaskRequest = {
    body:{
        title:string;
        description: string;
        assignee:string;
        dueDate: Date;
        status: "todo" | "in-progress" | "completed"
    }
}

type TaskT = {
    title: string,
    description:string,
    assignee:string,
    dueDate:Date,
    status:string
}

export const addTask = asyncHandler(async(req:Request,res) => {

    if(!req.user){
        throw new ApiError(401, "Unauthorized")
    }
2
    const result = createTaskSchema.safeParse(req.body)

    console.log(result)

    
    if (!result.success) {
        console.log("zod err", result.error.issues);

        throw new ApiError(400,result.error.issues[0]?.message || "Zod validation failed"
    );
    }

    const { title, description, assignee, dueDate, status } = result.data;

    if(!mongoose.isValidObjectId(assignee)){
        throw new ApiError(400, "Invalid mongo id")
    }

    if(!title || !description || !assignee || !dueDate || !status ){
        throw new ApiError(400,"All Fields are required")
    }
    ``
    if(!["todo", "in-progress", "completed"].includes(status)){
        throw new ApiError(400,"Please Enter Valid Status value")
    }

    const assigneeUser = await User.findById(assignee)

    if(!assigneeUser){
        throw new ApiError(404, "user not found")
    }

    const addTask = await Task.create({
        title: title.trim(),
        description,
        assignee,
        dueDate,
        status,
        createdBy: req.user._id,
    })

    return res.status(200).json(
        new ApiResponse(200,addTask, "Task Created Succssfully")
    )
    
})


// type fullDocTaskT = {
//     _id:mongoose.Types.ObjectId,
//     title:string,
//     description:string,
//     assignee:string,
//     dueDate:Date,
//     status:string
// }

export const getAllTask = asyncHandler(async(req,res) => {
    const allTask = await Task.find().sort({dueDate: -1}).populate("assignee","name email").populate("createdBy","name email")
    
    if(allTask.length === 0){
        throw new ApiError(400,"There is a no Task")
    }

    return res.status(200).json(
        new ApiResponse(200, allTask, "Task Fectched Successfully")
    )

})

type singleTaskRequest = {
    params:{
        taskId?:mongoose.Types.ObjectId;
    }
}

export const getSingleTask = asyncHandler(async(req:singleTaskRequest,res) =>{

    const result = getSingleTaskParamsSchema.safeParse(req.params)

    if(!result.success){
         throw new ApiError(400,result.error.issues[0]?.message || "Zod validation failed")
    }

    const {taskId} = result.data

    if(!isValidObjectId(taskId)){
        throw new ApiError(400,"Invalid TaskId")
    }

    const taskDB = await Task.findById(taskId).populate("createdBy","name email").populate("assignee","name email")
    if(!taskDB){
        throw new ApiError(404,"TASK NOT FOUND")
    }

    return res.status(200).json(
        new ApiResponse(200,taskDB,"Task Fetched Successfully")
    )

})

type updateTaskRequest = {
    body:{
        title?:string;
        description?: string;
        assignee?:string;
        dueDate?: Date;
        status?:string
    },
    params:{
        taskId?:mongoose.Types.ObjectId
    }
}

export const updateTask = asyncHandler(async(req:Request,res) => {

    if (!req.user) {
       throw new ApiError(401, "Unauthorized");
    }

    const result = updateTaskSchema.safeParse(req.body)
    const resultParmas = updateTaskParamsSchema.safeParse(req.params)

    if(!result.success){
        throw new ApiError(400, result.error.issues[0]?.message || "Zod Validation failed")
    }

    if(!resultParmas.success){
        throw new ApiError(400, resultParmas.error.issues[0]?.message || "Zod Validation failded" )
    }

    const {taskId} = req.params
    const {title, description, assignee, dueDate, status} = result.data

    if(!isValidObjectId(taskId)){
        throw new ApiError(400, "INVALID TASK ID")
    }
    
    const updateTask = await Task.findById(taskId);

    if (!updateTask) {
      throw new ApiError(404, "Task not found");
     }


    if(status && !["todo","in-progress","completed"].includes(status)){
        throw new ApiError(400,"Please Enter Valid Status Value")
    }


    if (updateTask.createdBy?.toString() !== req.user._id.toString()) {
       throw new ApiError(403, "You cannot update this task");
    }

  
    if (assignee !== undefined) {
  
       if (!isValidObjectId(assignee)) {
         throw new ApiError(400, "Invalid Assignee ID");
       }

       const assigneeUser = await User.findById(assignee);

        if (!assigneeUser) {
          throw new ApiError(404, "Assignee User Not Found");
      }
    }



   const updatedTask = await Task.findByIdAndUpdate(
  taskId,
  {
    $set: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(assignee !== undefined && { assignee }),
      ...(dueDate !== undefined && {
        dueDate: new Date(dueDate),
      }),
      ...(status !== undefined && { status }),
    },
  },
  {
    returnDocument: "after",
  }
).populate("createdBy","name email").populate("assignee","name email")

    return res.status(200).json(
        new ApiResponse(200, updatedTask,"Task updated successfully")
    )

})

type deleteTaskRequest = {
    params:{
        taskId?: mongoose.Types.ObjectId
    }
}

export const deleteTask = asyncHandler(async(req:Request,res) => {

    console.log("hello")

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }


    const result = deleteTaskParamsSchema.safeParse(req.params)

    if(!result.success){
        throw new ApiError(400, result.error.issues[0]?.message || "ZoD verification err")
    }

    const {taskId} = result.data

    if(!isValidObjectId(taskId)){
        throw new ApiError(400,"Invalid Task ID")
    }


     const task = await Task.findById(taskId);

    if (!task) {
      throw new ApiError(404, "Task Not Found");
    }

    if (task.createdBy?.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You cannot delete this task");
    }

    const deletedTask = await Task.findByIdAndDelete(taskId)


    return res.status(200).json(
        new ApiResponse(200,{},"Task deleted Successfully")
    )
})