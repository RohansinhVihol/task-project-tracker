import React, { useEffect, useState } from 'react'
import { createContext,useContext } from 'react'
import { tasks } from "../SampleData";



type Task = {
//    _id: string,
    title: string,
    description: string,
    assignee: string,
    status: 'todo' | 'in-progress' | 'completed'
    dueDate: string
}

type TaskContextType = {
    task: Task[],
    setTask: React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const  TaskProvider = ({children}: {children : React.ReactNode}) => {

    const [task, setTask] = useState<Task[]>([])

    useEffect(() => {
        setTask(tasks)
    },[])

    return(
        <TaskContext.Provider value={{task,setTask}}>
        {children}
        </TaskContext.Provider>
    )

}

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask must be used inside TaskProvider");
  }

  return context;
};
