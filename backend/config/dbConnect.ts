const mongoose = require('mongoose');
export const dbConnect = async ()=>{
    try{
        if (!process.env.MONGO_URL) {
          throw new Error('mongo url not defined')
        }
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDb successfull connected with: ${conn.connection.host}`);
        
    }
    catch(error){
        console.log(error)
        process.exit(1);
    }
}
