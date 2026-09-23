import {app} from './app.js'
import dotenv from 'dotenv'
import { connectDB } from './db/index.js'
dotenv.config()

const port = process.env.PORT

connectDB().then(() => (
    app.listen(port , () =>{
        console.log(`server start on port ${port}`)
    })
)).catch((err) => console.log(`Error occurs during starting server ${err.message}`))
