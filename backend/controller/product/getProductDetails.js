import productModel from '../../models/productModel.js'

const getProductDetails = async (req,res)=>{
    try {
        const {productId} = await req.body;

        const product = await productModel.findById(productId);

        res.json({
            data : product,
            error : false,
            success : true,
            message : "OK"
        })

    } catch (error) {
        res.status(500).json({
            message: error?.message || error,
            error : true,
            success : false
        });
    }
    
}
export  default getProductDetails;