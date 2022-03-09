const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const users=require("./model/user");
const methodOverride=require("method-override");

app.set("views","./views");
app.set("view engine","ejs");
app.use(bodyParser());
app.use(methodOverride("_method"));
app.use(express.static("public"));

const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/assignment_4");

app.get("/",async(req,res)=>{
    // res.send("Hello World!!!!");
    const user=await users.find();
    console.log(user);
    res.render("html.ejs",{user});
})

app.get("/user/form",(req,res)=>{
    res.render("form.ejs")
})

app.post("/user/add",async(req,res)=>{
    // console.log(req.body);
    const adding=await users.create(req.body);
    res.redirect("/");
})

app.put("/user/:id",async(req,res)=>{
    if(req.body.isPromoted===null){
        const updating=await users.updateOne({_id:req.params.id},{isPromoted:true});
    }
    else{
        const updating=await users.updateOne({_id:req.params.id},{isPromoted:true});
    }
    res.redirect("/");
})

app.put("/isPromoteded/:id",async(req,res)=>{
    const updating=await users.updateOne({_id:req.params.id},{isPromoted:false});
    res.redirect("/");
})

app.delete("/user/:id",async(req,res)=>{
    const deleting=await users.deleteOne({_id:req.params.id})
    res.redirect("/");
})

app.listen(3000,()=>console.log("server at 3000 port"));