const router=require("express").Router();
const Category=require("../models/category");

// POST Request 
router.post("/category",async(req,res)=>{
    console.log(req.body.type)
    try {
        const category=new Category()
        category.type=req.body.type;
        await category.save()
        res.json({
            success:true,
            message:"Sucessfuly created category"     
        })
    } catch (error) {
        res.json({status:false,message:error.message});
    }
})
router.get("/categorys",async(req,res)=>{
    try {
        let categorys=await Category.find();
        res.json({
            success:true,
            category:categorys
        })
    } catch (error) {
         res.json({
           success: false ,
            message:error.message
        });
    }
})
module.exports=router;