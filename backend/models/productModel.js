import { mongoose } from "mongoose";

const productSchema = new  mongoose.Schema({
        productName : String,
        brandName : String,
        category : String,
        productImage : [],
        description : String,
        price : Number,
        sellingPrice : Number
},{
    timestamps:true //It adds createdAt and updatedAt as fields in the db for each document
});

const  productModel = mongoose.model("product",productSchema);
export default productModel;
