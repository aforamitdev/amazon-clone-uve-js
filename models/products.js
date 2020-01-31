const mongoose=require("mongoose")
const Schema =mongoose.Schema;

const projuctSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  owner: { type: Schema.Types.ObjectId, ref: "Owner" },
    title:String,   
    description:String,
    price:Number,
    suk:Number,
    rating:[Number],
    photo:String,

});


module.exports=mongoose.model("Product",projuctSchema)