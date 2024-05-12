import mongoose from 'mongoose';
const addToCart = mongoose.Schema({
        productId : {
           ref : "product",
           type : String
        },
        quantity : Number,
        userId : String
    },
    {
    timestamp : true
})
const addToCartModel = mongoose.model("addToCart",addToCart);
export default addToCartModel;