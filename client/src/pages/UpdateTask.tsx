import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import {updateTaskSchema, type updateFormData} from '../Zod-Validation/Task.Schema'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';

const UpdateTask = () => {

      const navigate = useNavigate()
      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [assignee, setAssignee] = useState("");
      const [status, setStatus] = useState("todo");
      const [dueDate, setDueDate] = useState("");
      const [taskUpdated, setTaskUpdated] = useState(false)
      const [loading, setLoading] = useState<boolean>(false)
      const [error, setError] = useState<boolean>(false)

  
    const {taskId} = useParams()

    type TaskT = {
        _id: string,
        title: string,
        assignee: string,
        description: string,
        status: 'todo' | 'in-progress' | 'completed'
        dueDate: Date
        
    }

    const fetchTask = async() => {
        try {
            
            const res = await axios.get(backendUrl + `/api/tasks/${taskId}`)
            if(res.data.success){
                const task:TaskT = res.data.data

                setTitle(task.title)
                setDescription(task.description)
                setAssignee(task.assignee)
                setStatus(task.status)
                setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0]: "")

// task.dueDate → gets the date from the backend, e.g. "2026-09-30T00:00:00.000Z".
// new Date(task.dueDate) → converts it into a JavaScript Date object.
// .toISOString().split("T")[0] → gets only "2026-09-30".
// setDueDate(...) → puts "2026-09-30" into the <input type="date">.

            }
            
        } catch (error) {
            console.log('fetchTask by id',error)
            setError(true)
        }
    }

    useEffect(() => {
        fetchTask()
    },[taskId])


    const updateTaskHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        try {
            setLoading(true)
            e.preventDefault();
            const updatedTask = {
                ...(title && {title}),
                ...(description && {description}),
                ...(assignee && {assignee}),
                ...(status && {status}),
                ...(dueDate && {dueDate})
            }
            const res = await axios.patch(backendUrl + `/api/tasks/${taskId}`,
                updatedTask
            )

            if(res.data.success){
                toast.success("Task Updated Successfully")
                setTaskUpdated(true)
                navigate('/')
                
            
            }
            
        } catch (error:any) {
            console.log(error)
            console.log(error.response?.data);
            setError(true)
        }
        finally{
            setLoading(false)
        }
    }

    // const {register, handleSubmit, formState:{errors},reset} = useForm<updateFormData>({
    //   resolver: zodResolver(updateTaskSchema),
    //   defaultValues:{
    //     title: "",
    //     description: "",
    //     status:"in-progress",
    //     assignee: "",
    //     dueDate: ""
    //   }
    // })

    // const onSubmit =  async(data:updateFormData) => {

    //   console.log(data)

    //   try {
    //     const res = await axios.patch(backendUrl + `/api/tasks/${taskId}`,data)
    //   } catch (error) {
    //     console.log(error)
    //   }

    //   reset()

    // }

    if (loading){
        return <div className="flex justify-center items-center min-h-screen">
          <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
           <p>Loading...</p>
          </div>
          </div>

    }
    if(error){
        return <div>Something went wrong during try to interact with api</div>
    }
    
  return (
    <>

    <div className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Update Task</h2>

      <form 
        onSubmit={updateTaskHandler}
        className="flex flex-col gap-3">

        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>

          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>

          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label htmlFor="assignee" className="block mb-1">
            Assignee
          </label>

          <input
            type="text"
            id="assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label htmlFor="status" className="block mb-1">
            Status
          </label>

          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="dueDate" className="block mb-1">
            Due Date
          </label>

          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <button className='bg-blue-600 text-white rounded py-2 hover:bg-blue-700'>Update Task</button>
        </form>
        {/* <p>{taskUpdated ?"TASK Updated Successfully" :null}</p> */}
    </div> 
    </>


   
)
}

export default UpdateTask;