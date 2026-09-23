import express from 'express'
import cookieParser from 'cookie-parser'
import {errorHandler} from './middlewares/errorHandler.middlware.js'
import taskRoutes from './Routes/Task.routes.js'
import projectRoutes from './Routes/Project.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/' , (req,res) => {
    res.json({
        message : "API Working",
    })
})

app.use('/api',taskRoutes)
// app.use('/api',projectRoutes)

app.use(errorHandler)

export {app}