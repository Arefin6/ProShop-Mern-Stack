import express from 'express'
import { addNewOrder, getAllOrders, getMyOrders, getOrderById, updateOrderToDelivered, updateOrderToPaid} from '../controllers/orderController.js'
import { isAdmin, protect } from '../middleware/authMiddleware.js'


const router = express.Router()


router.route('/')
.post(protect,addNewOrder)
.get(protect,isAdmin,getAllOrders)
router.route('/myOrders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/delivered').put(protect,isAdmin,updateOrderToDelivered)

export default router