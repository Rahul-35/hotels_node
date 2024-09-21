const express=require('express');
const router=express.Router();
const Person = require('./../models/Person');

router.get("/",async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('Your data is fetched!!');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

router.get('/:works',async (req,res)=>{
    try{
        const workType=req.params.works;
        if(workType=='chef'||workType=='waiter'||workType=='manager'){
            const response=await Person.find({work:workType});
            res.status(200).json(response);
        }
        else{
            console.log("Wrong work type");
            res.status(404).json({error:'Not found'});
        }
    }
    catch(error){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.post("/",async (req,res)=>{

    try{
        const data=req.body;

        const newPerson=new Person(data);
    
        const response= await newPerson.save();
        console.log('Your input data is successfully saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }

   
    // const newPerson=new Person();

    // newPerson.name=data.name;
    // newPerson.age=data.age;
    // newPerson.work=data.work;
    // newPerson.mobile=data.mobile;
    // newPerson.email=data.email;
    // newPerson.address=data.address;
    // newPerson.salary=data.salary;
});

router.put("/:id",async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPerson=req.body;

        const response=await Person.findByIdAndUpdate(personId,updatedPerson,{
            new:true,
            runValidators:true
        });

        if(!response){
            console.log('Document not found');
            res.status(404).json({error:'Document not found'});
        }
        console.log('Document successfully updated!!');
        res.status(200).json(response);

    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const idel=req.params.id;
        const response=await Person.findByIdAndDelete(idel);
        if(!response)
        {
            console.log('Document not found');
            res.status(404).json({error:'Document not found'});
        }
            console.log('Document successfully deleted!');
            res.status(200).json({message:'Document successfully deleted!'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
});

module.exports=router;