import express from 'express';
import userSignUpController from '../controller/user/userSignUp.js';
import userSigninController from '../controller//user/userSignin.js';
import cookieParser from 'cookie-parser';
import authThoken from '../middelware/authToken.js';
import userDetails from '../controller/user/userDetails.js';
import userLout from '../controller/user/userLogout.js';
import allUser from '../controller/user/allUser.js';
import updateUser from '../controller/user/updateuser.js';
import UploadProductcontroler from '../controller/product/uploadProduct.js';
import getProductController from '../controller/product/getProduct.js';
import updateProductController from '../controller/product/updateProduct.js';
import getCateogoryProduct from '../controller/product/getCategoryProductOne.js';
import getCateogoryWiseProduct from '../controller/product/getCategoryWiseProduct.js';
import getProductDetails from '../controller/product/getProductDetails.js';
import addToCartController from '../controller/user/addToCartController.js';
import countAddToCartProduct from '../controller/user/countAddToCartProduct.js';
import addToCartViewProduct from '../controller/user/addToCartViewProduct.js';
import updateAddToCartProduct from '../controller/user/updateAddToCart.js';
import deleteAddToCartProduct from '../controller/user/deleteAddToCartProduct.js';
import searchProduct from '../controller/product/searchProducts.js';
import filterProductController from '../controller/product/filterProduct.js';


const router = express.Router();

router.use(cookieParser());

router.post("/signup",userSignUpController);
router.post("/signin",userSigninController);
router.get("/user-details",authThoken,userDetails);
router.get("/logout",userLout);

//admin pannel
router.get("/all-user",authThoken,allUser);
router.post("/update-user",authThoken,updateUser)

//uploade products
router.post("/upload-product",authThoken,UploadProductcontroler);
router.get("/get-product",getProductController);
router.post("/update-product",authThoken,updateProductController);
router.get("/get-cateogoryProduct",getCateogoryProduct)
router.post("/category-product",getCateogoryWiseProduct);
router.post("/product-details",getProductDetails);


// user add to cart
router.post("/addtocart",authThoken,addToCartController)
router.get("/countAddToCartProduct",authThoken,countAddToCartProduct);
router.get("/view-cart-product",authThoken,addToCartViewProduct);
router.post("/update-cart-product",authThoken,updateAddToCartProduct);
router.post("/delete-cart-product",authThoken,deleteAddToCartProduct);


// user search product
router.get("/search",searchProduct);
router.post("/filter-product",filterProductController);



export default router;
