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
       
        res.status(401).send({message:"Invalid UserName Or Password"})
        // throw new Error('Invalid email or password')
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
        throw new Error('Invalid user data') 
     }
})

//Update User Profile


const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        user.name= req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.send({
           _id:updatedUser.id,
           name:updatedUser.name,
           email:updatedUser.email,
           isAdmin:updatedUser.isAdmin,
        })
    }
    else{
       res.status(404)
       throw new Error('Invalid user data') 
    }
})





//Register User

const registerUser = asyncHandler(async(req,res)=>{
     
    const {name,email,password} = req.body

    const userExits = await User.findOne({email})
      
     if(userExits){
         res.status(400)
        
         throw new Error('User already exists')
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
         throw new Error('Invalid user data')
     }

})

//get All User For ADmin


const getAllUsers = asyncHandler(async(req,res)=>{

    const users = await User.find({})
     
    res.send(users)
    
})

const deleteUser = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.params.id)
     
     if(user){
         await user.remove()
         res.send({message:'User Removed'})
     }
     else{
         res.status(404)
         res.json({message:'Not Found'})
     }
    
})




export {authUser,getUserProfile,registerUser,updateUserProfile,getAllUsers,deleteUser}