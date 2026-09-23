import mongoose from "mongoose";
import {z} from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(1,"Title is required"),
    description: z.string().min(1,"Description is required"),
    status: z.enum(["todo","in-progress","completed"]),
    assignee: z.string().min(1,"Assignee is required"),
    dueDate: z.string()
})

export type createTaskSchema = z.infer<typeof createTaskSchema>

export const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    status: z.enum(["todo","in-progress","completed"]).optional(),
    assignee: z.string().min(1).optional(),
    dueDate: z.date().optional()
})

export type updateTaskSchema = z.infer<typeof updateTaskParamsSchema>

export const updateTaskParamsSchema = z.object({
    taskId: z.string().refine((id) => mongoose.isValidObjectId(id),{
        message: "INvalid Mongodb id"
    })
})

export const deleteTaskParamsSchema = z.object({
    taskId: z.string().refine((id) => mongoose.isValidObjectId(id),{
        message: "INVALID MONGODB ID"
    })
})

export const getSingleTaskParamsSchema = z.object({
   taskId: z.string().refine((id) => mongoose.isValidObjectId(id),{
   message: "Invalid MongoDB ID"
    }) 
})



