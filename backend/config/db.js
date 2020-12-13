import  mongoose  from 'mongoose'


const connectDb = async ()=>{
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI,{
          useUnifiedTropology:true,
          useUrlParser:true,
          useCreateIndex:true
      })  
      console.log(`MongoDb Connected ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        
        console.log(`Error ${error.message}`.red.bold)
        process.exit(1)
    }
}

export default connectDb;