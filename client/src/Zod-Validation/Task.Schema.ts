import {z} from 'zod'

export const taskSchema = z.object({
    title : z.string().min(1,"Title is required"),
    description: z.string().min(1,"description is required"),
    status: z.enum(['todo','in-progress','completed']),
    dueDate: z.string(),
    assignee: z.string().min(1,"Assignee is required")
})

export type TaskFormData = z.infer <typeof taskSchema>

export const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    description : z.string().min(1).optional(),
    status: z.enum(['todo','in-progress','completed']).optional(),
    dueDate: z.string().optional(),
    assignee: z.string().min(1).optional()
})

export type updateFormData = z.infer<typeof updateTaskSchema>

