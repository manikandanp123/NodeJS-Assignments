const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const SECRET="restapi";

mongoose.connect("mongodb://localhost:27017/assignment_5");

const loginRoutes=require("./routes/login");
const registerRoutes=require("./routes/register");
const postRoutes=require("./routes/post");
// const userRoutes=require("./routes/user");

app.use("/api/v1/posts",(req,res,next)=>{
    var token = req.headers.authorization.split("test ")[1];
    if(!token){
        return res.status(401).json({
            status: "failed",
            message: "Token is missing"
        })
    }
    // verify the token
    jwt.verify(token, SECRET, async function(err, decoded) {
        if(err){
            return res.status(401).json({
                status:"failed",
                message: "Invalid token"
            })
        }
        req.user = decoded.data;        // important
        next();
    });
});

app.use("/api/v1/login",loginRoutes);
app.use("/api/v1/register",registerRoutes);
app.use("/api/v1",postRoutes);
// app.use("/api/v1/user",userRoutes);

app.listen(3000,()=>console.log("server at 3000"));
