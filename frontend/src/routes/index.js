import { createBrowserRouter } from "react-router-dom";
import App from  "../App.js";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import ForgotPassword from "../pages/ForgotPassword.js";
import SignUp from "../pages/SignUp.js";
import AdminPanel from "../pages/AdminPanel.js";
import AllUser from "../pages/AllUser.js";
import AllProducts from "../pages/AllProducts.js";
import CategoryProduct from "../pages/CategoryProduct.js";
import ProductDetails from "../pages/ProductDetails.js";
import Cart from "../pages/Cart.js";
import SearchPages from "../pages/SearchPages.js";
const router = createBrowserRouter([
    {
        path : '/',
        element :<App/>,
        children: [
            {
                path: "", 
                element : <Home/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path: '/forgot-password',
                element:<ForgotPassword/>
            },
            {
                path:'/sign-up',
                element:<SignUp/>
            },
            {
                path : 'Cart',
                element : <Cart/>
            },
            {
                path : '/search',
                element : <SearchPages/>
            },
            {
                path: '/product-category',
                element: <CategoryProduct/>
            },
            {
                path : '/product/:id',
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path: '/admin-pannel',
                element : <AdminPanel/>,
                children : [
                    {
                        path: 'all_users',
                        element : <AllUser/>
                    },
                    {
                        path :'product',
                        element :<AllProducts/>
                    }
                ]
            }
        ]
    }
]);

export default router;