import express from 'express'
import { authUser, deleteUser, getAllUsers, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import { isAdmin, protect } from '../middleware/authMiddleware.js'



const router = express.Router()

router.route('/').post(registerUser).get(protect,isAdmin,getAllUsers)
router.route('/profile')
.get(protect,getUserProfile)
.put(protect,updateUserProfile)
router.post('/login',authUser)

router.route('/:id').delete(protect,isAdmin,deleteUser)



export default router