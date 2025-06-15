// import React from 'react';
import {BrowserRouter,Route,Routes ,useLocation}from 'react-router-dom'
import HomePage from './pages/home-page';
import ProductByBrand from './pages/product-by-brand';
import ProductByCategory from './pages/product-by-category';
import ProductByKeyword from './pages/product-by-Keyword';
import Profile from './pages/Profile';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import Complain from './pages/Complain';
import About from './pages/About';
import HowToBuy from './pages/How-to-buy';
import Refund from './pages/Refund';
import Term from './pages/Term';
import Login from './pages/Login';
import Otp from './pages/Otp';
import ProfileForm from './pages/ProfileForm';
import WishList from './pages/WishList';
import Cart from './pages/Cart';
import OrderPage from './pages/OrderPage';
import InvoiceProductDetailsPage from './pages/InvoiceProductDetailsPage';

const App = () => {
    // const location= useLocation()
    return (
        <div>
            {/* <AnimatePresence mode="wait"> */}


            <BrowserRouter>
         <Routes>
            <Route path="/"element={<HomePage/>}></Route>
            <Route path="/ByBrand/:id"element={<ProductByBrand/>}></Route>
            <Route path="/ByCategory/:id"element={<ProductByCategory/>}></Route>
            <Route path="/ByKeyword/:keyword"element={<ProductByKeyword/>}></Route>
            <Route path="/profile"element={<Profile/>}></Route>
            <Route path="/profileForm"element={<ProfileForm/>}></Route>

            <Route path="/details/:id"element={<ProductDetails/>}></Route>

            <Route path="/contact"element={<Contact/>}></Route>
            <Route path="/complain"element={<Complain/>}></Route>
            <Route path="/about"element={<About/>}></Route>
            <Route path="/how-to-buy"element={<HowToBuy/>}></Route>
            <Route path="/refund"element={<Refund/>}></Route>
            <Route path="/term"element={<Term/>}></Route>

            <Route path="/login"element={<Login/>}></Route>
            <Route path="/otp"element={<Otp/>}></Route>

            <Route path="/wish"element={<WishList/>}></Route>
            <Route path="/cart"element={<Cart/>}></Route>
            <Route path="/orders"element={<OrderPage/>}></Route>
            <Route path="/invoice/:id"element={<InvoiceProductDetailsPage/>}></Route>
         </Routes>
         </BrowserRouter>

            {/* </AnimatePresence> */}
         
        </div>
    );
};

export default App;