import  express from 'express'
import  dotEnv from 'dotenv'
import productRoutes from './router/productRouter.js' 
import connectDb from './config/db.js'
import  colors from 'colors'

dotEnv.config()

connectDb()
const app = express()

app.get('/',(req,res)=>{
    res.send('Hello Arefin');
})

app.use('/api/products',productRoutes)

const Port = process.env.PORT;
app.listen(Port||8080 ,console.log('Listening buddy'.yellow.bold));