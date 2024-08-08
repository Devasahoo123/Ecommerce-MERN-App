import productModel from "../../models/productModel.js";

const searchProduct = async(req,res)=>{
    try{
        const query = req.query.q

       const regex = new RegExp(query,'i','g')

       const product =await productModel.find({
        "$or":[
            {productName:regex},
            {category:regex}
        ]
       })
       res.status(200).json({
        message: "item found",
        data: product,
        error : false,
        success : true
       });
    }
    catch (error) {
        res.status(500).json({
            message: error?.message || error,
            error : true,
            success : false
        });
    }
}

export default searchProduct;