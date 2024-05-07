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



export default router;
