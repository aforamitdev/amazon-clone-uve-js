const router=require("express").Router();
const Owner=require("../models/owner");

// POST api

router.post("/owner",async(req,res)=>{
    const {name,about}=req.body
    console.log(name,about)
    try {
        let owner=new Owner({
            name,about
        })
        await owner.save();
        res.json({
            success:true,
            message:"owner create sucess fully"
        })
    } catch (error) {   

        res.json({
            success:false,
            message:error.message
        })

    }
})
router.get("/owners", async (req, res) => {
  try {
    let owner = await Owner.find();
    res.json({
      success: true,
      owner: owner
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
});



module.exports=router;