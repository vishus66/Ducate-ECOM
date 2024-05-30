import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Home from './Home'
import About from './About'
import Error from './Error'
import ContactUs from './ContactUs'
import Shop from './Shop'
import SingleProduct from './SingleProduct'
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'
import Cart from './Cart'
import Checkout from './Checkout'
import Confirmation from './Confirmation'


import AdminHome from './Admin/Home/AdminHome'

import Maincategory from './Admin/Maincategory/Maincategory'
import CreateMaincategory from './Admin/Maincategory/CreateMaincategory'
import UpdateMaincategory from './Admin/Maincategory/UpdateMaincategory'

import Subcategory from './Admin/Subcategory/Subcategory'
import CreateSubcategory from './Admin/Subcategory/CreateSubcategory'
import UpdateSubcategory from './Admin/Subcategory/UpdateSubcategory'

import Brand from './Admin/Brand/Brand'
import CreateBrand from './Admin/Brand/CreateBrand'
import UpdateBrand from './Admin/Brand/UpdateBrand'


import Product from './Admin/Product/Product'
import CreateProduct from './Admin/Product/CreateProduct'
import UpdateProduct from './Admin/Product/UpdateProduct'

import Testimonial from './Admin/Testimonial/Testimonial'
import CreateTestimonial from './Admin/Testimonial/CreateTestimonial'
import UpdateTestimonial from './Admin/Testimonial/UpdateTestimonial'

import Newsletter from './Admin/Newsletter/Newsletter'

import User from './Admin/User/User'

import ContactUsQueries from './Admin/ContactUs/ContactUsQueries'
import ContactUsShow from './Admin/ContactUs/ContactUsShow'
import CheckoutQueries from './Admin/Checkout/CheckoutQueries'
import CheckoutShow from './Admin/Checkout/CheckoutShow'

export default function App() {
    let [flag,setFlag]= useState(false)
    useEffect(()=>{
        setFlag(!flag)
    },[window.location.href])
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/single-product/:id" element={<SingleProduct />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                {/* Buyer Routes */}
                {
                    localStorage.getItem("login") ?
                        <>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/update-profile" element={<UpdateProfile />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/confirmation" element={<Confirmation />} />
                        </> : ""
                }


                {/* Admin Routes */}
                {
                    localStorage.getItem("login") && localStorage.getItem("role")==="Admin" ?
                        <>
                            <Route path="/admin" element={<AdminHome />} />

                            <Route path="/admin/maincategory" element={<Maincategory />} />
                            <Route path="/admin/maincategory/create" element={<CreateMaincategory />} />
                            <Route path="/admin/maincategory/update/:id" element={<UpdateMaincategory />} />

                            <Route path="/admin/subcategory" element={<Subcategory />} />
                            <Route path="/admin/subcategory/create" element={<CreateSubcategory />} />
                            <Route path="/admin/subcategory/update/:id" element={<UpdateSubcategory />} />

                            <Route path="/admin/brand" element={<Brand />} />
                            <Route path="/admin/brand/create" element={<CreateBrand />} />
                            <Route path="/admin/brand/update/:id" element={<UpdateBrand />} />

                            <Route path="/admin/product" element={<Product />} />
                            <Route path="/admin/product/create" element={<CreateProduct />} />
                            <Route path="/admin/product/update/:id" element={<UpdateProduct />} />

                            <Route path="/admin/testimonial" element={<Testimonial />} />
                            <Route path="/admin/testimonial/create" element={<CreateTestimonial />} />
                            <Route path="/admin/testimonial/update/:id" element={<UpdateTestimonial />} />

                            <Route path="/admin/newsletter" element={<Newsletter />} />

                            <Route path="/admin/user" element={<User />} />

                            <Route path="/admin/contact-us" element={<ContactUsQueries />} />
                            <Route path="/admin/contact-us/show/:id" element={<ContactUsShow />} />

                            <Route path="/admin/checkout" element={<CheckoutQueries />} />
                            <Route path="/admin/checkout/show/:id" element={<CheckoutShow />} />
                        </> : ""}
                <Route path="/*" element={<Error />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
