import express from 'express'
import { createProduct, createProductReview, deleteProduct, getProducts, getProductsById, updateProduct } from '../controllers/productController.js'
import { isAdmin, protect } from '../middleware/authMiddleware.js'



const router = express.Router()


router.route('/')
.get(getProducts)
.post(protect,isAdmin,createProduct)

router.route('/:id/reviews').post(protect,createProductReview)

router.route('/:id')
.get(getProductsById)
.delete(protect,isAdmin,deleteProduct)
.put(protect,isAdmin,updateProduct)

export default router