const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes.js')
const chatRoutes = require('./routes/chatRoutes.js')
const messageRoutes = require('./routes/messageRoutes.js')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

const connect = async() =>{
    await mongoose.connect(process.env.DATABASE)
    .then(()=>console.log('connect db'))
    .catch((err)=>console.log(err))
}

app.use(express.json())
app.use(cors())



app.listen(3001,()=>{
    console.log('server run on 3001')
})

connect()

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)