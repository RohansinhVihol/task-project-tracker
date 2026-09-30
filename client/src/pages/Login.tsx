import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const {checkAuth} = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isRegister) {
        const res = await axios.post(
          backendUrl + "/api/user/register",
          {
            name,
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          toast.success("Registration successful");

          setName("");
          setEmail("");
          setPassword("");
          setIsRegister(false);
          await checkAuth();
  navigate("/")
          
        }
      } else {
        const res = await axios.post(
          backendUrl + "/api/user/login",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          toast.success("Login successful");

          setEmail("");
          setPassword("");
          navigate('/')
        }
      }
    } catch (error: any) {
      console.error(error);

    }
  };

  return (
    <>
    <div>
      <button
          onClick={() => navigate(-1)}
          className="m-2 border border-gray-300 px-4 py-2  rounded-lg hover:bg-gray-100 transition">
          ← Back
        </button>
    </div>
    <div className="min-h-screen flex items-center justify-center">
    
      <div className="w-96 border p-5">
        
        <h2 className="text-xl font-bold text-center mb-5">
          {isRegister ? "Register" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          {isRegister && (
            <div>
              <label>Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="w-full border p-2"
              />
            </div>
          )}

          <div>
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full border p-2"
            />
          </div>

          <div>
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2"
          >
            {isRegister ? "Register" : "Login"}
          </button>

        </form>

        <div className="text-center mt-4">
          {isRegister ? (
            <p>
              Already have an account?
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-blue-500"
              >
                Login
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-blue-500"
              >
                Register
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
    </>
  );
};

export default Auth;