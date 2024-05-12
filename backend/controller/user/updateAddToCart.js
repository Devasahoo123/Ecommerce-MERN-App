import addToCartModel from "../../models/cartProduct.js"
const updateAddToCartProduct = async(req,res)=>{
    try{
        const currentUserId = req.userId
        const addToCartProductId = req?.body?.id
        const qty = req.body.quantity
        const updateproduct = await addToCartModel.findByIdAndUpdate(addToCartProductId, {
            $set: {
                quantity: qty,
            }
        }, {$new: true})
        

        res.json({
            data : updateproduct,
            message : "Product Updated in cart",
            error : false,
            success : true
        })
    }
    catch(err){
        res.status(400).json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

export default updateAddToCartProduct;