import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { backendUrl } from '../App'

type User = {
    _id:string,
    name:string,
    email:string
}

type authConetstType = {
    user: User | null,
    loading: boolean,
    isAuthenticated: boolean
    checkAuth: () => Promise<void>
}

const authContext = createContext<authConetstType | null>(null)

export const AuthProvider = ({children}:{children : React.ReactNode}) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const checkAuth = async() => {
        try {
            const res = await axios.post(backendUrl + '/api/user/auth-user',{},{withCredentials:true})
            if(res.data.success){
                setUser(res.data.data)
            }
        } catch (error) {
            console.log(error)
            setUser(null)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuth()
    },[])

    return(

        <authContext.Provider value={{user,loading,isAuthenticated : !!user,checkAuth}}>
            {children}
        </authContext.Provider>

    )
}

export const useAuth = () => {
    const context = useContext(authContext)

    if(!context){
        throw new Error("Auth Context Error")
    }
    return context
}


