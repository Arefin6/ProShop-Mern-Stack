import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateAuthToken from '../utiles/generateToken.js'




const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.send({
            _id:user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateAuthToken(user._id)
        })
    }
    else{
        res.status(401)
        res.send({
            message:"Invalid User OR Password"
        })
    }

})

//Get userProfile

const getUserProfile = asyncHandler(async(req,res)=>{
     const user = await User.findById(req.user._id)
     if(user){
         res.send({
            _id:user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
         })
     }
     else{
        res.status(404)
        res.send({
            message:"Invalid User OR Password"
        }) 
     }
})


//Register User

const registerUser = asyncHandler(async(req,res)=>{
     
    const {name,email,password} = req.body

    const userExits = await User.findOne({email})
      
     if(userExits){
         res.status(400)
         res.send({
            message:"User Already Exits "
        }) 
     }

     const user = await User.create({
         name,
         email,
         password
     })

     if(user){
         res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateAuthToken(user._id)
         })
     }
     else{
         res.status(400)
         res.send({
            message:"Invalid User data"
        }) 
     }

})


export {authUser,getUserProfile,registerUser }