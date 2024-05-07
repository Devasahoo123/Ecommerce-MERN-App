import productModel from "../../models/productModel.js";

// get all products

const getCateogoryProduct = async(req,res) => {
    try {
        
        const productsCategory = await productModel.distinct("category");
        // arry of products to store from each category
        const productsByCategory = [];
        // loop through each category
        for (let i = 0; i < productsCategory.length; i++) {
            // get all products from each category
            const product = await productModel.findOne({category : productsCategory[i]});
            // push each category to the array
            if(product)
            productsByCategory.push(product);
        }

        res.status(200).json({
            message: "category product",
            error : false,
            success : true,
            data : productsByCategory

        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error : true,
            success : false
        });
    }
}

export default getCateogoryProduct;