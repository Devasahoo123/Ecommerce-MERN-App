import uploadeProductPermission from "../../helpers/permission.js";
import productModel from "../../models/productModel.js"

const UploadProductcontroler =async(req,res)=>{
    try{
        
        const sessionUserId = req.userId
        if(!uploadeProductPermission(sessionUserId)){
            throw new Error("You are not allowed to upload product")
        }

        const uploadProduct =  new productModel(req.body);
        const saveProduct=await uploadProduct.save();
        res.status(201).json({
            message : "Product Uploaded Successfully",
            error : false,
            success : true,
            data : saveProduct
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
export default UploadProductcontroler;