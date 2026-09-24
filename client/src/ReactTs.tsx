import axios from "axios"
import { useEffect, useState } from "react"


const ReactTs = () => {
    
    // const [count, setCount] = useState<number>(0)
    // setCount((prev) => prev + 1)

    // const [name , setName] = useState<string>('Rahul')
    // const [isOpen, setIsOpen] = useState<boolean>(true)

    // const [names, setNames] = useState<string[]>(['Rohit','Devansh','Krish'])
    // setNames(prev => [...prev,"Ayush"])

    // const [numbers, setNumbers] = useState<number[]>([10,20,30])
    // setNumbers(prev => [...numbers,40])

    // type User = {
    //     name:string,
    //     age:number,
    //     isActive: boolean
    // }
    // const [user, setUser] = useState<User | null>({
    //     name:'Ayushi',
    //     age:23,
    //     isActive:true
    // })

    // type Tasks = {
    // id:number,
    // title:string,
    // completed:boolean,
    // }

    // const [tasks, setTask] = useState<Tasks[] | null>([])
    
    // // setTask(prev => [...prev,{id:3, title:'Mern Auth', completed:false}])
    // // setTask(prev => prev ? {...prev , age:prev.age+1} :null)

    // type Status = 'todo' | 'in-progress' | 'completed'
    // const [status, setStatus] = useState<Status>('in-progress')


    // //Props pass using ts

    // type UserT = {
    //     name:string,
    //     age:number
    // }

    // function User({name,age}:userT){

    //     return(
    //         <div>
    //         <p>{name}</p>
    //         <p>{age}</p>
    //         </div>
    //     )
    // }

    //Event Handling via ts

    // input = e: React.ChangeEvent<HTMLInputElement>
    // textArea =  e: React.ChangeEvent<HTMLTextAreaElement>

    // button event
    // React.MouseEvent<HTMLDivElement>
    // React.MouseEvent<HTMLButtonElement>
    // React.MouseEvent<HTMLAnchorElement>

    //form handling
    // e: React.FormEvent<HTMLFormElement>

    type UserType = {
        id:number,
        name:string,
        email:string
    }

    const [userData, setUserData] = useState<UserType[]>([])

    const fetchUserData = async () => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users')
            setUserData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUserData()
    },[])

    return (
        <>
        <div>

        <div className="flex gap-10 font-bold">
            <div>UserID</div>
            <div>UserName</div>
            <div>UserEmail</div>
        </div>

        {userData.map((data) => (
            <div className="flex gap-10" key={data.id}>
            <div>{data.id}</div>
            <div>{data.name}</div>
            <div>{data.email}</div>
            </div>
        ))}
        </div>
        </>
    )
    }

export default ReactTs