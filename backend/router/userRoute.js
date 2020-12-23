import express from 'express'
import { authUser, deleteUser, getAllUsers, getUserById, getUserProfile, registerUser, updateUserById, updateUserProfile } from '../controllers/userController.js'
import { isAdmin, protect } from '../middleware/authMiddleware.js'



const router = express.Router()

router.route('/').post(registerUser).get(protect,isAdmin,getAllUsers)
router.route('/profile')
.get(protect,getUserProfile)
.put(protect,updateUserProfile)
router.post('/login',authUser)

router.route('/:id')
.delete(protect,isAdmin,deleteUser)
.get(protect,isAdmin,getUserById)
.put(protect,isAdmin,updateUserById)



export default router