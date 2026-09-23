import mongoose, { isValidObjectId } from 'mongoose'
import { Project } from '../models/project.model.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import { Task } from '../models/Task.model.js'
import {createTaskSchema} from '../zod-validator/task.validator.js'

type addProjectRequest = {
    body:{
        name:string;
        description: string;
        createdBy: string  
    }
}

export const createProject = asyncHandler(async(req:addProjectRequest,res) => {

    const {name, description, createdBy} = req.body

    if(!name || !description || !createdBy){
        throw new ApiError(400, "All Fields are Required")
    }
    const addProject = await Project.create({
        name: name.trim(),
        description: description,
        createdBy
    })

    return res.status(201).json(
        new ApiResponse(201, addProject, "Task Created Successfully")
    )

})

type updateProjectRequest = {
    body:{
        name?: string;
        description?: string;
        createdBy?: string
    },
    params:{
        projectId?:mongoose.Types.ObjectId
    }
}

export const updateProject = asyncHandler(async(req:updateProjectRequest,res) => {
    const {projectId} = req.params
    const {name, description, createdBy} = req.body

    if(!isValidObjectId(projectId)){
        throw new ApiError(400,"Invalid ProjectId")
    }

    const updatedData = await Project.findByIdAndUpdate(projectId,{
        $set:{
            name: name && name.trim(),
            description: description && description,
            createdBy: createdBy && createdBy
        },
        new: true
    })

    return res.status(200).json(
        new ApiResponse(200, updatedData, "Task Updated Successfully")
    )
})

type deleteProjectRequest = {
    params:{
        projectId?: string
    }
}

export const deleteProject = asyncHandler(async(req:deleteProjectRequest,res) => {
    const {projectId} = req.params

    if(!isValidObjectId(projectId)){
        throw new ApiError(400,"Invalid ProjectId")
    }

    const deletedTask = await Task.findByIdAndDelete(projectId)

    return res.status(200).json(
        new ApiResponse(200,"Task Deleted Successfully")
    )
})

export const getAllProject = asyncHandler(async(req,res) => {
    const allProjects = await Task.find()

    if(!allProjects){
        throw new ApiError(400,"There is a no Projects")
    }

    return res.status(200).json(
        new ApiResponse(200,"Projects Fetched Successfully")
    )
})