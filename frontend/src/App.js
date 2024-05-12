import { useEffect, useState } from 'react';
import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummarApi from './common/SummarApi';
import Context from './context';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';

function App() {
  // Redux dispatch hook
  const dispatch = useDispatch();
  const [cartProductCount,setCartProductCount] = useState(0)

  // Function to fetch user details
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummarApi.current_user.url, {
      method: SummarApi.current_user.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const dataApi = await dataResponse.json();
    
    if (dataApi.success) {
      // Dispatch action to set user details in Redux store
      dispatch(setUserDetails(dataApi.data));
    }
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummarApi.addToCartProductCount.url, {
      method: SummarApi.addToCartProductCount.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

  })
  const dataApi = await dataResponse.json()
  setCartProductCount(dataApi?.data?.count)
}

  // Fetch user details on component mount
  useEffect(() => {
    // Fetch user details
    fetchUserDetails();
    // Fetch user cart details
    fetchUserAddToCart();
  }, [])

  return (
    <>
      {/* Context provider for user details */}
      <Context.Provider value={{
        fetchUserDetails, // fetching user details
        cartProductCount, // current user add to cart product count
        fetchUserAddToCart
      }}>
        {/* Toast notifications container */}
        <ToastContainer 
          position='bottom-right'
        />
        {/* Header component */}
        <Header />
        <br />
        {/* Main content */}
        <main className='min-h-[cal(100vh-100px)] pt-16'>
          {/* Router outlet for rendering nested routes */}
          <Outlet />
        </main>
        <br />
        {/* Footer component */}
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
