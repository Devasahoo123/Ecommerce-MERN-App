import productModel from '../../models/productModel.js'

const getProductDetails = async (req,res)=>{
    try {
        const {productId} = req.body;

        const product = await productModel.findOne({_id: productId});

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