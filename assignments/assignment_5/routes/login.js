const express=require("express");
const router=express.Router();
const {body,validationResult}=require("express-validator");
const users=require("../model/user");
const bodyParser=require("body-parser");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const SECRET="restapi";

// router.post("/",(req,res)=>{
//     res.json("ok")
// })

router.use(bodyParser());

router.post("/",body("email"),body("password"),async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const user=await users.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json("wrong mail id");
        }

        bcrypt.compare(req.body.password,user.password,async function(err,result){
            if(result){
                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, SECRET);
    
                res.status(200).json({
                    status:"success",
                    message:"logged in successfully",
                    token
                })
            }else{
                return res.status(400).json("wrong password")
            }
        })
    }
    catch(e){
        return res.json({
            status:"failed",
            message:e.message
        })
    }
})
module.exports=router;