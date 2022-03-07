const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const faker=require("faker");

app.use(bodyParser.urlencoded({extended:false}));

app.set("views","./views");
app.set("view engine","ejs");

var i=0;
var users=[];
for(var i=0;i<6;i++){
    users.push({
        name:faker.name.findName(),
        age:26+i,
        city:faker.address.city(),
        email:faker.internet.email()
    })
}
app.get("/",(req,res)=>{
    res.render("homePage.ejs",{users});
})

app.get("/form",(req,res)=>{
    res.render("form.ejs")
})

app.post("/user/add",(req,res)=>{
    console.log(req.body);
    users.push({
        number:i,
        name:req.body.name,
        age:req.body.age,
        city:req.body.city,
        email:req.body.email
    })
    i++;
    res.redirect('/');
})

app.listen(3000,()=>console.log("server at  3000"));