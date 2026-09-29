import axios from "axios";
import { backendUrl } from "../App";
import { tasks } from "../SampleData";

export const getAllTasks = async() =>{
    const res = await axios.get(backendUrl + '/api/tasks')
    return res.data.data
}

// type todo
export const addTask = async(task:any) => {
    const res = await axios.post(backendUrl + '/api/tasks',task)
    return res.data.data
}

// type todo
export const updateTask = async({taskId,data}:any) => {
    const res = await axios.patch(backendUrl + `/api/tasks/${taskId}`,data)
    return res.data.data
}

export const deleteTask = async(taskId:any) => {
    const res = await axios.delete(backendUrl + `/api/tasks/${taskId}`)
    return res.data.data
}