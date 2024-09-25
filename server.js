const express=require('express');
const app=express();
const db=require('./db.js');
require('dotenv').config();
const port=process.env.PORT||2000;                      //in 
const bodyParser=require('body-parser');
app.use(bodyParser.json());                             //This will fetch the body from the request into a form
const passport=require('./auth.js');
 //this is for username and password

//Middleware
const logReq = (req, res, next) => {
    // Parse the URL to extract query parameters
    const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
    const queryParams = new URLSearchParams(url.search);

    // Mask sensitive query parameters
    if (queryParams.has('username')) queryParams.set('username', '****');
    if (queryParams.has('password')) queryParams.set('password', '****');

    // Reconstruct the sanitized URL
    const sanitizedUrl = url.pathname + '?' + queryParams.toString();

    // Log the sanitized URL
    console.log(`[${new Date().toLocaleString()}] Request made to url: ${sanitizedUrl}`);

    next(); // Move on to the next phase
};

app.use(logReq); //this will make use of log in all requests

app.use(passport.initialize());

const localMidware=passport.authenticate('local',{session:false});

app.get("/",localMidware,(req,res)=>{
    res.send("Hello Welcome to our Hotel");
});

const personRoute=require('./routes/personRoutes.js');
const menuR=require('./routes/menuRoutes.js');

app.use('/person',localMidware,personRoute);
app.use('/menu',localMidware,menuR);

app.listen(port,()=>{
    console.log("Server is live at port 2000");
});




























// // var fs=require('fs');
// // var os=require('os');

// // var user=os.userInfo();
// // user.username="rahulsmr";
// // console.log(user);

// // fs.appendFile('hello.pdf','Hi '+user.username+"! Smriti Mandhana is queen \n",()=>{
// //     console.log("File created");
// // });
// var _=require('lodash');

// var note=require('./notes.js');
// console.log(note.age);
// console.log("The sum is: "+note.addNum(2,3));


// const data=[1,2,2,3,3,"smr",'smr','smr',"smr","1","2",'1','2']

// var fil=_.uniq(data);

// console.log(fil);

// console.log(_.isString('a'));

// // function callback(){
// //     console.log("callback is called");
// // }

// // var add=(a,b,callback)=>{
// //     console.log("Sum: "+(a+b));
// //     callback();
// // }

// // //add(2,3,callback);

// // // add(2,3,function(){
// // //     console.log("Add callback");
// // // });

// // add(2,3,()=>{console.log("Add callback!!")});

// // // function add(a,b){
// // //     return a+b;
// // // }

// // var add=(a,b)=>{return a+b};

// // console.log("Sum:"+add(122,3));


// // (function(){
// //     console.log("Rahul SMR");
// // })();