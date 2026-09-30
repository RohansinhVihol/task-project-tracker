import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import {taskSchema , type TaskFormData} from '../Zod-Validation/Task.Schema'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../api/TaskApi";
import { isBackEdge } from "zod/v4/core";

const AddNewTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");
  const [taskSubmitted, setTaskSubmitted] = useState(false)
  const navigate = useNavigate()

  type User = {
  _id: string;
  name: string;
  email: string;
};
  const [users, setUsers] = useState<User[]>([])

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(backendUrl + "/api/tasks", {
        title,
        description,
        assignee,
        status,
        dueDate,
      });

      if (res.data.success) {
        console.log("Task created successfully");
        setTaskSubmitted(true)
        setTitle('')
        setAssignee('')
        setDueDate('')
        setDescription('')
        setStatus('')
        toast.success("TASK ADDED")
      }
    } catch (error:any) {
      console.log(error);{
      console.log(error.response?.data);
      toast.error(error.resolve?.data)
}
    }
  };

  const {register, handleSubmit, formState: {errors},reset} = useForm<TaskFormData>({
    resolver:zodResolver(taskSchema),
    defaultValues:{
      title:"",
      description: "",
      status:"todo",
      assignee:"",
      dueDate: ""
    }
  })

  const onSubmit = async (data: TaskFormData) => {

    console.log(data)
try {
  
    const res = await axios.post(backendUrl + '/api/tasks',data,{
      withCredentials:true
    })

    if(res.data.success){
        console.log("Task created successfully");
        toast.success("TASK ADDED")
        navigate('/')
    }
  
    reset()
} catch (error:any) {

  console.error(error)
    toast.error(
    error.response?.data?.message || "You need to login first"
  );
  
}

  }


  //perform rest operaion using tanstack query

  const queryClient = useQueryClient()

  const {mutate, isPending, isError, error} = useMutation({
    mutationFn:addTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["tasks"]
      });
      console.log("Task Created Successfully");
      toast.success("Task Added")
      reset()
      navigate('/')
      
    },

    onError:(error) => {
      console.log(error)
    }

  });

  const onSubmitt = (data:any) => {
    mutate(data)
  }

  const fetchUsers = async() => {
    try {
      const res = await axios.get(backendUrl + '/api/user/all-user')
  
      if(res.data.success){
          setUsers(res.data.data)
          console.log(res.data.data);
          
      }
    } catch (error) {
      console.error(error)
    }

    
  }

  useEffect(() => {
    fetchUsers()
  },[])


  return (
    // <>
    //   <div className="max-w-md mx-auto mt-8 p-4 border rounded">
    //     <button
    //       onClick={() => navigate(-1)}
    //       className="m-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
    //       ← Back
    //     </button>
    // <div className="max-w-md mx-auto mt-8 p-4 border rounded">
    //   <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
    //   <form
    //     className="flex flex-col gap-3"
    //     onSubmit={onSubmitHandler}>
    //     <div>
    //       <label htmlFor="title" className="block mb-1">
    //         Title
    //       </label>

    //       <input
    //         type="text"
    //         id="title"
    //         value={title}
    //         onChange={(e) => setTitle(e.target.value)}
    //         className="w-full border rounded px-2 py-1"
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="description" className="block mb-1">
    //         Description
    //       </label>

    //       <textarea
    //         id="description"
    //         rows={3}
    //         value={description}
    //         onChange={(e) => setDescription(e.target.value)}
    //         className="w-full border rounded px-2 py-1"
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="assignee" className="block mb-1">
    //         Assignee
    //       </label>

    //       <input
    //         type="text"
    //         id="assignee"
    //         value={assignee}
    //         onChange={(e) => setAssignee(e.target.value)}
    //         className="w-full border rounded px-2 py-1"
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="status" className="block mb-1">
    //         Status
    //       </label>

    //       <select
    //         id="status"
    //         value={status}
    //         onChange={(e) => setStatus(e.target.value)}
    //         className="w-full border rounded px-2 py-1">
    //         <option value="todo">Todo</option>
    //         <option value="in-progress">In Progress</option>
    //         <option value="completed">Completed</option>
    //       </select>
    //     </div>

    //     <div>
    //       <label htmlFor="dueDate" className="block mb-1">
    //         Due Date
    //       </label>

    //       <input
    //         type="date"
    //         id="dueDate"
    //         value={dueDate}
    //         onChange={(e) => setDueDate(e.target.value)}
    //         className="w-full border rounded px-2 py-1"
    //       />
    //     </div>

    //     <button type="submit" className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700">
    //       Add Task
    //     </button>
    //   </form>

    //   {/* {taskSubmitted ? <div>TASK Add successfully</div>: null} */}
    // </div>
    // {/* <div className="text-center text-3xl mt-4">{taskSubmitted ? "TASK ADDED" :null}</div> */}
    // </div>
    // </>

    <>
     <div className="max-w-md mx-auto mt-8 p-4 border rounded">
        <button
          onClick={() => navigate(-1)}
          className="m-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
          ← Back
        </button>
    <div className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title" className="blockn mb-1">
            Title
          </label>

          <input
          {...register("title")}
            type="text"
            id="title"
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>

          <textarea
            {...register("description")}
            id="description"
            rows={3}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label htmlFor="assignee" className="block mb-1">
            Assignee
          </label>

          <select
          {...register("assignee")}
          id="assignee"
          className="w-full border rounderd px-2 py-1"
          >
            <option value="">Select Assignee</option>
            {users?.map((user:any) => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block mb-1">
            Status
          </label>

          <select
          {...register("status")}
            id="status"
            className="w-full border rounded px-2 py-1">
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
          {...register('dueDate')}
            type="date"
            id="dueDate"
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700">
          Add Task
        </button>
      </form>

      {/* {taskSubmitted ? <div>TASK Add successfully</div>: null} */}
    </div>
    {/* <div className="text-center text-3xl mt-4">{taskSubmitted ? "TASK ADDED" :null}</div> */}
    </div>
    </>
  );
};

export default AddNewTask;