const express=require("express")
const morgan =require("morgan")
const mongoose=require("mongoose")
const dotenv =require("dotenv")
const bodyParser=require("body-parser")
dotenv.config();

const User=require("./models/user")

mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true, useUnifiedTopology:true},(err,result)=>{
    if (err) {
        console.log(err)
    }else{
        console.log("Connected to mongodb")
    }
})


const app=express()

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// routers
const products=require("./routes/Products")
const category=require("./routes/category")
const owner=require("./routes/owner")
app.use("/api/", products);
app.use("/api/",category)
app.use("/api/", owner);



app.get("/",(req,res)=>{
    res.json({message:"hello amazon"})
})


app.post("/",(req,res)=>{

    const {name,email,password}=req.body;
    let user=new User({name,email,password})
    user.save((err)=>{
        if (err) {
            res.json(err)
        }else{
                res.json("scess fully ")
        }
    })

 
})

app.listen(8080,()=>{
    console.log("running on 8080")
}) 