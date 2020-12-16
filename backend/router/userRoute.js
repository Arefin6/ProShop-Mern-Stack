import express from 'express'
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'



const router = express.Router()

router.route('/').post(registerUser)
router.route('/profile').get(protect,getUserProfile)
router.post('/login',authUser)



export default router