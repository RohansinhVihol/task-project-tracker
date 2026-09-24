import { useEffect, useState } from "react";
import { tasks } from "../SampleData.js";
import { useTask } from "../context/TaskContext.js";
import { useNavigate} from 'react-router-dom'

const AllTasks = () => {

  const navigate = useNavigate()


  type Task = {
    title : string,
    description : string,
    assignee : string,
    status : "todo" | "in-progress" | "completed",
    dueDate : string
  }

  const [taskData, setTaskData] = useState<Task[]>([])

  const fetchTaskApi = async() => {
    setTaskData(tasks)
  }

  useEffect(() => {
    fetchTaskApi()
  },[])

  const {task} = useTask()
  

  return (
    <>
      <div className="text-xl font-bold">AllTasks</div>

      <div className="mt-5">
        {task.map((data) => (
          <div key={data.dueDate}className="flex gap-5 items-center border p-3 mb-3">

            <div>
              <p>Title</p>
              <p>{data.title}</p>
            </div>

            <div>
              <p>Description</p>
              <p>{data.description}</p>
            </div>

            <div>
              <p>Assignee</p>
              <p>{data.assignee}</p>
            </div>

            <div>
              <p>Status</p>
              <p>{data.status}</p>
            </div>

            <div>
              <p>Due Date</p>
              <p>{data.dueDate}</p>
            </div>

          </div>
        ))}
      </div>
      <button className="border border-2" onClick={() => navigate('/user-api')}>Users</button>
    </>
  );
};

export default AllTasks;