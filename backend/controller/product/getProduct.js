import productModel from "../../models/productModel.js";
const getProductController=async(req,res)=>{
    try{
        const allproduct = await productModel.find().sort({createdAt : -1});

        res.json({
            message : "All product",
            data : allproduct,
            error : false,
            success : true
        })
    }
    catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

export default getProductController;