import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const UpdateTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  const [users, setUsers] = useState<any[]>([]);

  const [taskUpdated, setTaskUpdated] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Fetch Task
  const fetchTask = async () => {
    try {
      const res = await axios.get(
        backendUrl + `/api/tasks/${taskId}`
      );

      if (res.data.success) {
        const task = res.data.data;

        setTitle(task.title);
        setDescription(task.description);

    
        setAssignee(task.assignee?._id || "");

        setStatus(task.status);

        setDueDate(
          task.dueDate
            ? new Date(task.dueDate)
                .toISOString()
                .split("T")[0]
            : ""
        );
      }
    } catch (error) {
      console.log("fetchTask by id", error);
      setError(true);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        backendUrl + "/api/user/all-user"
      );

      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTask();
    fetchUsers();
  }, [taskId]);

  const updateTaskHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setLoading(true);
      e.preventDefault();

      const updatedTask = {
        ...(title && { title }),
        ...(description && { description }),
        ...(assignee && { assignee }),
        ...(status && { status }),
        ...(dueDate && { dueDate }),
      };

      console.log("Updated Task:", updatedTask);

      const res = await axios.patch(
        backendUrl + `/api/tasks/${taskId}`,
        updatedTask,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Task Updated Successfully");
        setTaskUpdated(true);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );

      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Something went wrong during try to interact with API
      </div>
    );
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-4 border rounded">

        <button
          onClick={() => navigate(-1)}
          className="m-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          ← Back
        </button>

        <div className="max-w-md mx-auto mt-8 p-4 border rounded">

          <h2 className="text-xl font-semibold mb-4">
            Update Task
          </h2>

          <form
            onSubmit={updateTaskHandler}
            className="flex flex-col gap-3"
          >

            <div>
              <label
                htmlFor="title"
                className="block mb-1"
              >
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
              <label
                htmlFor="description"
                className="block mb-1"
              >
                Description
              </label>

              <textarea
                id="description"
                rows={3}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div>
              <label
                htmlFor="assignee"
                className="block mb-1"
              >
                Assignee
              </label>

              <select
                id="assignee"
                value={assignee}
                onChange={(e) =>
                  setAssignee(e.target.value)
                }
                className="w-full border rounded px-2 py-1"
              >
                <option value="">
                  Select Assignee
                </option>

                {users.map((user) => (
                  <option
                    key={user._id}
                    value={user._id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block mb-1"
              >
                Status
              </label>

              <select
                id="status"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="w-full border rounded px-2 py-1"
              >
                <option value="todo">
                  Todo
                </option>

                <option value="in-progress">
                  In Progress
                </option>

                <option value="completed">
                  Completed
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="block mb-1"
              >
                Due Date
              </label>

              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
            >
              Update Task
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateTask;