const mongoose=require("mongoose");

const connectDB = async  ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log("DATABASE CONNECTED SUCESSFULLY");
    }catch(err){
        console.log("error connecting to mongo db",err);
        process.exit(1);
    }
};

module.exports = connectDB;
