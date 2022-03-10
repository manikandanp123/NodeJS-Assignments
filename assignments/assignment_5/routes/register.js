const express=require("express");
const router=express.Router();
const {body,validationResult}=require("express-validator");
const users=require("../model/user");
const bodyParser=require("body-parser");
const bcrypt=require("bcrypt")

router.use(bodyParser());
// router.post("/",(req,res)=>{
//     res.json("ok")
// })

router.post("/",body("name"),body("email"),body("password"),async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        bcrypt.hash(req.body.password,10,async function(err,hash){
            if(err){
                return res.json({
                    status:"failed",
                })
            }
            const creating=await users.create({
                name:req.body.name,
                email:req.body.email,
                password:hash
            });
            return res.status(200).json({
                status:"passed",
                massage:"registered successfully",
                creating
            })
        })
    }
    catch(e){
        return res.status(404).json({
            status:"failed",
            meassage:e.meassage
        })
    }
})

module.exports=router;