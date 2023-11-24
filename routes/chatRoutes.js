const express = require('express')
const chatModel = require('../models/chatModel.js')

const router = express.Router()

// add chat

router.post('/addchat', async (req, res) => {
    try {
        const { senderId, recieverId } = req.body
        if (senderId && recieverId) {
            const isChat = await chatModel.findOne({
                $and: [
                    { users: { $in: [senderId] } },
                    { users: { $in: [recieverId] } },
                ]
            })
            if (isChat) {
                res.json(isChat)
            } else {
                const newChat = await chatModel.create({ users: [senderId, recieverId] })
                res.json(newChat)
            }
        } else {
            res.json('atleast two user needed for conversation')
        }
    } catch (error) {
        res.json(error)
    }
})

// get Chat 

router.get('/getchat/:userId',async(req,res)=>{
    try {
        const {userId} = req.params
        const isChat = await chatModel.find({users:{$in:[userId]}})
        if(isChat){
            res.json(isChat)
        }else{
            res.json('chat not found')
        }
    } catch (error) {
        res.json(error)
    }
})
module.exports = router