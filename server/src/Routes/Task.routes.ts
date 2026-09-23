import {Router}from "express";
import { addTask, deleteTask, getAllTask, getSingleTask, updateTask } from '../controllers/task.controller.js'
import {createTaskValidator, deleteTaskValidator, getSingleTaskValidator, updateTaskValidator} from '../Express-Validators/task.validator.js'
import {validate} from '../middlewares/validator.middleware.js'

const router = Router()

//router.post('/tasks', createTaskValidator, validate, addTask)
router.post('/tasks', addTask)
router.get('/tasks', getAllTask)
//router.get('/tasks/:taskId', getSingleTaskValidator,validate,getSingleTask)
router.get('/tasks/:taskId',getSingleTask)
//router.patch('/tasks/:taskId', updateTaskValidator, validate, updateTask)
router.patch('/tasks/:taskId', updateTask)
router.delete('/tasks/:taskId',deleteTask)

// router.route('/tasks').post(createTaskValidator,validate,addTask).get(getAllTask)
// router.route('/tasks/:taskId').get(getSingleTask).patch(updateTask).delete(deleteTask)

export default router