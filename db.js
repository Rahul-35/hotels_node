const mongoose=require('mongoose');
require('dotenv').config();

//define mongo db connection url

//const monURL=process.env.localURL; //for local url
const monURL=process.env.dbURL; // for mongodb atlas url in order to use env we need process 

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