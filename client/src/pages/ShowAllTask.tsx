import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App.js";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
import { useQuery } from "@tanstack/react-query";
import {getAllTasks} from '../api/TaskApi.js'

const ShowAllTask = () => {

  const navigate = useNavigate()

  type Task = {
    _id : string
    title : string,
    description : string,
    assignee : string,
    status : "todo" | "in-progress" | "completed",
    dueDate : string
  }

  const [taskData, setTaskData] = useState<Task[]>([])
  const [taskDelete, setTaskDelete] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const [isRegister, setIsRegister] = useState<boolean>(false)

  const fetchTaskApi = async() => {
   try {
     setLoading(true)
     const res = await axios.get(backendUrl + '/api/tasks')


    await new Promise((resolve) => setTimeout(resolve, 500));
    
     if(res.data.success){
      setTaskData(res.data.data)
     }
 
   } catch (error:any) {
      console.log(error)
      setError(true)
   }
   finally{
    setLoading(false)
   }

  }

  useEffect(() => {
    fetchTaskApi()
  },[taskDelete])

    const authStatus = async() => {
    try {

      const res = await axios.post(backendUrl + '/api/user/auth-user',{},{withCredentials:true})

      if(res.data.success){
        setIsRegister(true)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const logOutUser = async() => {
    try {

      const res = await axios.post(backendUrl + '/api/user/logout',{},{withCredentials:true})
      if(res.data.success){
        setIsRegister(false)
      }

      
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() =>{
    authStatus()
  },[])

  //fetching data using Tanstack query 

  const {data, isPending, isError, error:QueryError}  = useQuery({queryKey:['tasks'],queryFn:getAllTasks})

  if(isPending){
    return <div>Loading...</div>
  }

  if(isError){
    return <div>Error from tanstack query...</div>
  }

  if(loading){
    return <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p>Loading...</p>
      </div>
    </div>

  }

  if(error){
    return <div>Something went wrong during fetching data</div>
  }
  

  const deleteTaskHandler = async(taskId : string) => {
    try {

      const res = await axios.delete(backendUrl + `/api/tasks/${taskId}`, { withCredentials:true })

      if(res.data.success){
        toast.success('Task Removed Successfully')
        fetchTaskApi()
      }
      2
    } catch (error:any) {
      console.log(error)
      toast.error(error.response?.data)
    }
  }

  return (
    <>
  <div className="min-h-screen bg-gray-50 p-6">


    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Task Dashboard
      </h1>

      <button onClick={() => navigate("/add-new")} className="border border-gray-400 px-4 py-2 bg-white hover:bg-gray-100 cursor-pointer">
      ADD NEW
      </button>

      <button onClick={() => isRegister ? logOutUser() : navigate('/auth')} className="border border-gray-400 px-4 py-2 bg-white hover:bg-gray-100 cursor-pointer">{isRegister ? "Logout" : "Login"}</button>
    </div>

    <div className="space-y-4">

      {taskData.map((data:any) => (
        <div
          key={data._id}
          className="border border-gray-300 bg-white p-4">
         <div className="mb-3">
            <p className="text-sm text-gray-500">Title</p>
            <p className="text-lg font-semibold text-gray-800">
              {data.title}
            </p>
          </div>

        
          <div className="mb-3">
            <p className="text-sm text-gray-500">Description</p>
            <p className="text-gray-700">
              {data.description}
            </p>
          </div>

      
          <div className="flex gap-10 mb-4">

            <div>
              <p className="text-sm text-gray-500">Assignee</p>
              <p className="text-gray-700">
                {data.assignee?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-gray-700">
                {data.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="text-gray-700">
                {new Date(data.dueDate).toLocaleDateString()}
              </p>
            </div>

          </div>

         
          <div className="flex gap-3">

            <button onClick={() => navigate(`/update-task/${data._id}`)} className="border border-blue-500 text-blue-600 px-3 py-1 hover:bg-blue-50 cursor-pointer">
            Update Task
            </button>

            <button onClick={() => deleteTaskHandler(data._id)} className="border border-red-500 text-red-600 px-3 py-1 hover:bg-red-50 cursor-pointer">
             Remove Task
            </button>

          </div>

        </div>
      ))}

    </div>
  </div>
    </>
  );
};

export default ShowAllTask;