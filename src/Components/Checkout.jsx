import React, { useEffect, useState } from 'react'

import Breadcrum from "./Breadcrum"
import { Link, useNavigate } from 'react-router-dom'
import ProfileTable from './ProfileTable'
import { useDispatch, useSelector } from 'react-redux'

import { deleteCart, getCart } from '../Store/ActionCreators/CartActionCreators'
import { getProduct, updateProduct } from '../Store/ActionCreators/ProductActionCreators'
import { addCheckout } from '../Store/ActionCreators/CheckoutActionCreators'
export default function Checkout() {
    let [user, setUser] = useState({})
    let [carts, setCarts] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)
    let [mode, setMode] = useState("COD")

    let dispatch = useDispatch()
    let CartStateData = useSelector((state) => state.CartStateData)
    let ProductStateData = useSelector((state) => state.ProductStateData)

    let navigate = useNavigate()

    function placeOrder() {
        let item = {
            userid: localStorage.getItem("userid"),
            orderstatus: "Order is Placed",
            paymentstatus: "Pending",
            paymentmode: "COD",
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),
            products: carts,
        }
        dispatch(addCheckout(item))
        for (let item of carts) {
            let p = ProductStateData.find((x) => x.id === item.productid)
            p.quantity = p.quantity - item.qty
            if(p.quantity===0)
            p.stock = false
            dispatch(updateProduct({ ...p }))
            dispatch(deleteCart({ id: item.id }))
        }

        navigate("/confirmation")
    }

    function getAPIData() {
        dispatch(getCart())
        if (CartStateData.length) {
            let data = CartStateData.filter((x) => x.userid === localStorage.getItem("userid"))
            let subtotal = 0
            let shipping = 0
            let total = 0
            for (let item of data) {
                subtotal = subtotal + item.total
            }
            if (subtotal > 0 && subtotal < 1000)
                shipping = 150

            total = subtotal + shipping

            setSubtotal(subtotal)
            setShipping(shipping)
            setTotal(total)
            setCarts(data)
        }
        else {
            setSubtotal(0)
            setShipping(0)
            setTotal(0)
            setCarts([])
        }
    }
    useEffect(() => {
        getAPIData()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])

    useEffect(() => {
        (async () => {
            let response = await fetch("/user/" + localStorage.getItem("userid"), {
                method: "get",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            if (response)
                setUser(response)
            else
                navigate("/login")
        })()
    })
    return (
        <>
            <Breadcrum title="Checkout" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-6">
                        <h5 className='bg-primary text-center p-2 text-light'>Billing & Shipping Address</h5>
                        <ProfileTable user={user} />
                    </div>
                    <div className="col-md-6">
                        <h5 className='bg-primary text-center p-2 text-light'>Cart Items</h5>
                        {
                            carts.length ?
                                <>
                                    <div className="table-responsive">
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>Brand</th>
                                                    <th>Color</th>
                                                    <th>Size</th>
                                                    <th>Price</th>
                                                    <th className='text-center'>Qty</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    carts.map((item, index) => {
                                                        return <tr key={index}>
                                                            <td>
                                                                <a href={`/images/${item.pic}`} target='_blank'>
                                                                    <img src={`/images/${item.pic}`} height={50} width={50} alt="" className='rounded' />
                                                                </a>
                                                            </td>
                                                            <td>{item.name}</td>
                                                            <td>{item.brand}</td>
                                                            <td>{item.color}</td>
                                                            <td>{item.size}</td>
                                                            <td>&#8377;{item.price}</td>
                                                            <td className='text-center'>{item.qty}</td>
                                                            <td>&#8377;{item.total}</td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <table className='table table-bordered'>
                                        <tbody>
                                            <tr>
                                                <th>SubTotal</th>
                                                <td>&#8377;{subtotal}</td>
                                            </tr>
                                            <tr>
                                                <th>Shipping</th>
                                                <td>&#8377;{shipping}</td>
                                            </tr>
                                            <tr>
                                                <th>Total</th>
                                                <td>&#8377;{total}</td>
                                            </tr>
                                            <tr>
                                                <th>Payment Mode</th>
                                                <td>
                                                    <select name="mode" onChange={(e) => setMode(e.target.value)} className='form-select'>
                                                        <option>COD</option>
                                                        <option>Net Banking</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}><button className='btn btn-primary w-100' onClick={placeOrder}>Place Order</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </> :
                                <div className='text-center'>
                                    <h4>No Items in Cart</h4>
                                    <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
