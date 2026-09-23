import { Router } from "express";
import {createProject, getAllProject, deleteProject} from '../controllers/project.controller.js'

const router = Router()

router.post('/project',createProject)
router.get('/project', getAllProject)
router.delete('/project/:projectId', deleteProject)
router.patch('/project/:projectId',deleteProject)

export default router