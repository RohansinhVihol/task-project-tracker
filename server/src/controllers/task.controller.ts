import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/apiError.js'
import {ApiResponse} from '../utils/apiResponse.js'
import { Task } from '../models/Task.model.js'
import mongoose, { isValidObjectId, Schema } from 'mongoose'
import {type Request , type Response} from 'express'
import { createTaskSchema, deleteTaskParamsSchema, getSingleTaskParamsSchema, updateTaskParamsSchema, updateTaskSchema } from '../zod-validator/task.validator.js'


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

export const addTask = asyncHandler(async(req:createTaskRequest,res) => {

    const result = createTaskSchema.safeParse(req.body)

    console.log(result)

    
    if (!result.success) {
        console.log("zod err", result.error.issues);

        throw new ApiError(400,result.error.issues[0]?.message || "Zod validation failed"
    );
    }

    const { title, description, assignee, dueDate, status } = result.data;

    if(!title || !description || !assignee || !dueDate || !status ){
        throw new ApiError(400,"All Fields are required")
    }
    ``
    if(!["todo", "in-progress", "completed"].includes(status)){
        throw new ApiError(400,"Please Enter Valid Status value")
    }

    const addTask = await Task.create({
        title: title.trim(),
        description,
        assignee,
        dueDate,
        status
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
    const allTask = await Task.find().sort({dueDate: -1})
    
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

    const taskDB = await Task.findById(taskId)

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

export const updateTask = asyncHandler(async(req:updateTaskRequest,res) => {

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
    if(status && !["todo","in-progress","completed"].includes(status)){
        throw new ApiError(400,"Please Enter Valid Status Value")
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId,
        {
    
            $set:{

                ...(title !== undefined && {title}),
                ...(description !== undefined && {description}),
                ...(assignee !== undefined && {assignee}),
                ...(dueDate !== undefined && {dueDate: new Date(dueDate)}),
                ...(status !== undefined && {status})

                // title: title && title,
                // description: description && description,
                // assignee: assignee && assignee,
                // dueDate: dueDate && dueDate,
                // status: status && status
            },
        },
        {
        new: true,
        }
    )

    const task = await Task.findById(taskId)

    if (!task) {
       throw new ApiError(404, "Task not found");
    }

    if(title) task.title = title
    if(description) task.description = description
    if(assignee) task.assignee = assignee
    if(dueDate) task.dueDate = dueDate
    if(status) task.status = status

    task.save()

    return res.status(200).json(
        new ApiResponse(200, task,"Task updated successfully")
    )

})

type deleteTaskRequest = {
    params:{
        taskId?: mongoose.Types.ObjectId
    }
}

export const deleteTask = asyncHandler(async(req:deleteTaskRequest,res) => {
    console.log("hello")

    const result = deleteTaskParamsSchema.safeParse(req.params)

    if(!result.success){
        throw new ApiError(400, result.error.issues[0]?.message || "ZoD verification err")
    }

    const {taskId} = result.data

    if(!isValidObjectId(taskId)){
        throw new ApiError(400,"Invalid Task ID")
    }

    const deletedTask = await Task.findByIdAndDelete(taskId)


    return res.status(200).json(
        new ApiResponse(200,{},"Task deleted Successfully")
    )
})