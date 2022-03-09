const mongoose=require("mongoose");
const {Schema}=mongoose;

const userSchema=new Schema({
    name:{type:String,requied:true},
    age:Number,
    email:{type:String,required:true,unique:true},
    select:{type:Boolean,default:null}  
})

const users=mongoose.model("User",userSchema);

module.exports=users;
