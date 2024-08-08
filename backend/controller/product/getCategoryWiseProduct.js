import productModel from "../../models/productModel.js";

const getCateogoryWiseProduct = async (req, res) =>{
    try{
        const {category} =req?.body ||req?.query;
        const product = await productModel.find({category});

        res.status(200).json({
            message : "Product fetched successfully",
            error : false,
            success : true,
            data : product
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

export default getCateogoryWiseProduct;