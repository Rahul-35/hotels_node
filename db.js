const mongoose=require('mongoose');

//define mongo db connection url

const monURL='mongodb://127.0.0.1:27017/hotels';

//set up mongodb connection

mongoose.connect(monURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;


db.on('connected',()=>{
    console.log("Connected to MongoDB server");
});

db.on('error',()=>{
    console.log("Connection error");
});

db.on('disconnected',()=>{
    console.log("Disconnected from MongoDB server");
});

module.exports=db;