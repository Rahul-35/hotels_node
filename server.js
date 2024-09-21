const express=require('express');
const app=express();
const db=require('./db.js');

const bodyParser=require('body-parser');
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("Hello Welcome to our Hotel");
});

const personRoute=require('./routes/personRoutes.js');
app.use('/person',personRoute);

const menuR=require('./routes/menuRoutes.js');
app.use('/menu',menuR);


app.listen(2000,()=>{
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