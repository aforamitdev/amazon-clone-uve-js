const router = require("express").Router();
const Product = require("../models/products");
const upload = require("../middlewares/upload-photo");
// POST request-create a new products

router.post("/products", upload.single("photo"), async (req, res) => {
  console.log(req.file);
  try {
    let product = new Product({
      title: req.body.title,
      description:req.body.description,
      photo: req.file.location,
      suk: req.body.suk
    });
    console.log(product);
    await product.save();
    res.json({
      success: true,
      message: "Sucessfully save"
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    });
  }
});

// GET requestt-get all products
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find();
    res.json({
      success: true,
      products: products
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
});
// get a single product 
router.get("/product/:id", async (req, res) => {
  try {
    let products = await Product.findOne({_id:req.params.id});
    res.json({
      success: true,
      products: products
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
});
// PUT request--Update a single peoducts
router.put("/product/:id",upload.single("photo"),async (req, res) => {
  try {
    let products = await Product.findByIdAndUpdate({ _id: req.params.id },{$set:{
      title:req.body.title,
      price:req.body.price,
      category:req.body.categoryID,
      photo:req.file.location,
      description:req.body.description,
      owner:req.body.ownerID
    }},{upsert:true});
    res.json({
      success: true,
      Updatedproducts: products
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
});
// DELETE request -deleted a single a prodc r

module.exports = router;
