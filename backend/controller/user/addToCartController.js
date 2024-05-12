import addToCartModel from "../../models/cartProduct.js";

const addToCartController =async(req,res)=>{
    try{
        const {productId} = req?.body;
        const currentUser = req.userId;

        const isProductAvialble = await addToCartModel.findOne({productId, userId: currentUser});

        if(isProductAvialble){
            return res.json({
                message : "Product is already in cart",
                error : true,
                success : false
            })
        }

        const payLoad = {
            productId : productId,
            quantity : 1,
            userId : currentUser
        }
        const newProduct = new addToCartModel(payLoad);
        const saveProduct=await newProduct.save();
        return res.status(200).json({
            data : saveProduct,
            message : "Product added to cart",
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

export default addToCartController;