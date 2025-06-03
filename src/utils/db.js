const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.URI)
        console.log('database connected')
    }catch(err){
        console.log(`database not connected`)
        process.exit(1)
    }
}

module.exports = connectDB ;