const express = require('express')
const userModel = require('../models/userModel.js')
const bcrypt = require('bcrypt')

const router = express.Router()


// user Register
router.post('/register',async(req,res)=>{
    try {
        const {name,email,pass} = req.body
        if(name && email && pass){
            const isUser = await userModel.findOne({email})
            if(isUser){
                res.json('user already register')
            }else{
                const hashed = await bcrypt.hash(pass,10)
                const user = await userModel.create({
                    name,email,pass:hashed
                })
                res.json(user)
            }
        }else{
            res.json('all field are required')
        }
    } catch (error) {
        res.json(error)
    }
})

// user Login

router.post('/login',async(req,res)=>{
    try {
        const {email,pass} = req.body
        if(email && pass){
            const isUser = await userModel.findOne({email})
            if(isUser){
                const match = await bcrypt.compare(pass,isUser.pass)
                if(match){
                    res.json(isUser)
                }else{
                    res.json('invalid email or password')
                }
            }else{
                res.json("user not found")
            }
        }else{
            res.json('all field are required')
        }
    } catch (error) {
        res.json(error)
    }
})

// get all users

router.get('/all',async(req,res)=>{
    try {
        const allUser = await userModel.find()
        res.json(allUser)
    } catch (error) {
        res.json(error)
    }
})

// get friend

router.get('/find/:userId',async(req,res)=>{
    try {
        const {userId} = req.params
        const user = await userModel.findById({_id:userId})
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})
module.exports = router