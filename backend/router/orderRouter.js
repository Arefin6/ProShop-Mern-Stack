import express from 'express'
import { addNewOrder, getMyOrders, getOrderById, updateOrderToPaid} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'


const router = express.Router()


router.route('/').post(protect,addNewOrder)
router.route('/myOrders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)

export default router