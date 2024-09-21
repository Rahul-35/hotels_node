const express=require('express');
const router=express.Router();
const MenuItem = require('./../models/MenuItem.js');

router.post("/",async (req,res)=>{

    try{
        const data= req.body;
        const newItem=new MenuItem(data);
        const response=await newItem.save();
        console.log('New menu item is saved!');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Server error'});
    }
});

router.get('/',async(req,res)=>{
    try{
       const data= await MenuItem.find();
        console.log('List of menu items printed');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Server error'});
    }
});

router.get('/:tasteBeLike',async (req,res)=>{

    try{
        const intTaste=req.params.tasteBeLike;
        if(intTaste=='sweet'||intTaste=='sour'||intTaste=='spicy')
        {
            const response=await MenuItem.find({taste:intTaste});
            res.status(200).json(response);
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Server error'});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const newId=req.params.id;
        const updatedBody=req.body;

        const response=await MenuItem.findByIdAndUpdate(newId,updatedBody,{
            new:true,
            runValidators:true
        });
        console.log(typeof response);
        if(!response){
            console.log('Menu Item not available!!');
            res.status(404).json({error:'Menu item not found'});
        }
        else{
            console.log('Menu item successfully updated!!');
            res.status(200).json({message:'Menu item successfully updated!!'});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Server error'});
    }
});

router.delete('/:id',async(req,res)=>{
    const delId=req.params.id;
    const response=await MenuItem.findByIdAndDelete(delId);
    console.log(response);
    if(!response){
        console.log('Menu Item not available!!');
        res.status(404).json({error:'Menu item not found'});
    }
    else{
        console.log('Menu item successfully deleted!!');
        res.status(200).json({message:'Menu item successfully deleted!!'});
    }
});

module.exports=router;