const express=require("express");
const router=express.Router();
const {body,validationResult}=require("express-validator");
const posts=require("../model/post");
const bodyParser=require("body-parser");
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');
const SECRET = "RESTAPI";

router.use(bodyParser());

// router.get("/posts",(req,res)=>{
//     res.json("ok")
// })

// GET
router.get("/posts",async(req,res)=>{
    try{
        const post=await posts.find();
        return res.status(200).json({
            status:"fetched sucessfully",
            post
        })
    }catch(e){
        return res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})

// POST
router.post("/posts",async(req,res)=>{
    try{
        const post=await posts.create({
            title:req.body.title,
            body:req.body.body,
            image:req.body.image,
            user:req.user
        });
        return res.status(200).json({
            status:"created sucessfully",
            post
        })
    }catch(e){
        return res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})
// PUT
router.put("/posts/:id",async(req,res)=>{
    try{
        const post=await posts.updateOne({_id:req.params.id,user:req.user},req.body);
        console.log(post);
        if(post.modifiedCount!==0){
            return res.status(200).json({
                status:"updated sucessfully",
                post
            })
        }
        return res.json("user cannot update it");
    }catch(e){
        return res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})
// DELETE

router.delete("/posts/:id",async(req,res)=>{
    try{
        const post=await posts.deleteOne({_id:req.params.id,user:req.user});
        return res.status(200).json({
            status:"deleted sucessfully",
            post
        })
    }catch(e){
        return res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})

module.exports=router;