import path from 'path'
import  express from 'express'
import  dotEnv from 'dotenv'
import productRoutes from './router/productRouter.js' 
import userRoutes from './router/userRoute.js' 
import orderRoutes from './router/orderRouter.js'
import uploadRoutes from './router/uploadRoutes.js' 
import connectDb from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import  colors from 'colors'

dotEnv.config()

connectDb()
const app = express()


app.use ( express.json())


app.use('/admin/api/products',productRoutes)
app.use('/api/user',userRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/upload',uploadRoutes)

app.get('/api/config/payPal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }




app.use(notFound)
app.use(errorHandler)

const Port = process.env.PORT;
app.listen(Port||8080 ,console.log('Listening buddy'.yellow.bold));