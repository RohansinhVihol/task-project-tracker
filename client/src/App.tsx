import { useState } from 'react'
import './App.css'
import AllTasks from './components/AllTasks'
import ReactTs from './ReactTs'
import {Route,Routes} from 'react-router-dom'

function App() {

  // const [count, setCount] = useState<number>(0)
  // setCount((prev) => prev + 1)

  // const [name , setName] = useState<string>('Rahul')
  // const [isOpen, setIsOpen] = useState<boolean>(true)

  // const [names, setNames] = useState<string[]>(['Rohit','Devansh','Krish'])
  // setNames(prev => [...prev,"Ayush"])

  // const [numbers, setNumbers] = useState<number[]>([10,20,30])
  // setNumbers(prev => [...numbers,40])

  // type User = {
  //   name:string,
  //   age:number,
  //   isActive: boolean
  // }
  // const [user, setUser] = useState<User | null>({
  //   name:'Ayushi',
  //   age:23,
  //   isActive:true
  // })

  // type Tasks = {
  //   id:number,
  //   title:string,
  //   completed:boolean,
  // }
  // const [tasks, setTask] = useState<Tasks[] | null>([])
  // // setTask(prev => [...prev,{id:3, title:'Mern Auth', completed:false}])
  // // setTask(prev => prev ? {...prev , age:prev.age+1} :null)

  // type Status = 'todo' | 'in-progress' | 'completed'
  // const [status, setStatus] = useState<Status>('in-progress')


  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">
       Hello world {count}
      </h1>
      <div className='flex justify-center items-center gap-5'>
      <button className='border text-3xl w-6 ' onClick={() => setCount(count - 1)}>-</button>
      <button className='border text-3xl w-6 ' onClick={() => setCount(count + 1)}>+</button>
      </div> */}


      {/* <AllTasks/> */}

      {/* <ReactTs/> */}


      <Routes>
        <Route path='/' element={<AllTasks/>}/>
        <Route path='/User-api' element={<ReactTs/>}/>
      </Routes>
    </>
  )
}

export default App
