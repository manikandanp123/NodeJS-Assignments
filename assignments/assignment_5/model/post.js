const mongoose=require("mongoose");
const {Schema}=mongoose;

const postSchema=new Schema({
    title:{type:String,required:true},
    body:{type:String},
    image:{type:String},
    user:{type:Schema.Types.ObjectId,ref:"User"}
})

const posts=mongoose.model("Post",postSchema);

module.exports=posts;
