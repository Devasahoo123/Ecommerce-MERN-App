import uploadeProductPermission from "../../helpers/permission.js";
import productModel from "../../models/productModel.js";
const updateProductController =async(req,res)=>{
    try{

        if(!uploadeProductPermission(req.userId)){
            throw new Error("You are not allowed to update product");
        }

        const {_id,...restBody}=req.body;
        const updateProduct = await productModel.findByIdAndUpdate(_id,restBody,{new : true});
        res.status(200).json({
            message : "Product updated successfully",
            error : false,
            success : true,
            data : updateProduct
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

export default updateProductController;