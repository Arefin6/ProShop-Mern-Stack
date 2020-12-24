import  express from 'express'
import  dotEnv from 'dotenv'
import productRoutes from './router/productRouter.js' 
import userRoutes from './router/userRoute.js' 
import orderRoutes from './router/orderRouter.js' 
import connectDb from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import  colors from 'colors'

dotEnv.config()

connectDb()
const app = express()

app.use ( express.json())

app.get('/',(req,res)=>{
    res.send('Hello Arefin');
})

app.use('/admin/api/products',productRoutes)
app.use('/api/user',userRoutes)
app.use('/api/order',orderRoutes)

app.get('/api/config/payPal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use(notFound)
app.use(errorHandler)

const Port = process.env.PORT;
app.listen(Port||8080 ,console.log('Listening buddy'.yellow.bold));