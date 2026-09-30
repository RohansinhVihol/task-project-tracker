import { useState } from 'react'
import './App.css'
import AllTasks from './pages/ShowAllTask'
import {Route,Routes} from 'react-router-dom'
import AddNewTask from './pages/AddNewTask'
import ShowAllTask from './pages/ShowAllTask'
import UpdateTask from './pages/UpdateTask'
import { ToastContainer, toast } from 'react-toastify';
import Auth from './pages/Login'
import ProtectedRoute from './protected-routes/ProtectedRoute'

function App() {

  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route element={<ProtectedRoute/>}>
        <Route path='/' element={<ShowAllTask/>}/>
        <Route path='/add-new' element={<AddNewTask/>}/>
        <Route path='/update-task/:taskId' element={<UpdateTask/>}/>
        </Route>
        <Route path='/auth' element={<Auth/>}/>
        
      </Routes>

    </>
  )
}


export const backendUrl = 'http://localhost:3000'



export default App
