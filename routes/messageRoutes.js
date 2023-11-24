const express = require('express')
const messageModel = require('../models/messageModel.js')

const router = express.Router()

// add message

router.post('/addmsg',async(req,res)=>{
    try {
        const {chatId,senderId,message} = req.body
        const msg = await messageModel.create({
            chatId,senderId,message
        })
        res.json(msg)
    } catch (error) {
        res.json(error)
    }
})

// get message

router.get('/getmsg/:chatId',async(req,res)=>{
        const {chatId} = req.params
        const msg = await messageModel.find({chatId})
        res.json(msg)
})

module.exports = router