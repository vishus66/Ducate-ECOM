import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { addNewsletter, getNewsletter } from "../Store/ActionCreators/NewsletterActionCreators"
export default function Footer() {
    let [email, setEmail] = useState("")
    let [message, setMessage] = useState("")

    let dispatch = useDispatch()
    let NewsletterStateData = useSelector((state) => state.NewsletterStateData)

    function postData(e) {
        e.preventDefault()
        if (email.length===0)
            setMessage("Please Enter a Valid Email Address")
        else if (NewsletterStateData.find((x) => x.email === email))
            setMessage("Your Email Address is Already Registered With Us")
        else {
            dispatch(addNewsletter({ email: email }))
            setMessage("Thanks to Subscribe our Newsletter Services")
            setEmail("")
        }
    }
    useEffect(() => {
        (() => {
            // dispatch(getNewsletter())
        })()
    }, [NewsletterStateData.length])
    return (
        <>
            <div className="container-fluid bg-dark text-light footer mt-3 py-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container py-1">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className='text-light'><Link to="/" className='text-light'>Ducat</Link></h1>
                            <p className='text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, nisi cupiditate, eos iure cumque doloremque libero maiores ea tenetur perspiciatis nihil minus natus, odit tempora aspernatur molestiae explicabo repellat non.</p>
                        </div>
                        <div className="col-md-6 mb-5">
                            <h5 className="text-white mb-4">Newsletter</h5>
                            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                            <p>{message}</p>
                            <div className="position-relative w-100">
                                <form onSubmit={postData}>
                                    <input className="form-control bg-white border-0 w-100 py-3 ps-4 pe-5" name='email' value={email} onChange={(e) => setEmail(e.target.value)} type="text"
                                        placeholder="Your email" />
                                    <button type="submit"
                                        className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5">
                        <div className="col-md-4">
                            <h5 className="text-white mb-4">Quick Links</h5>
                            <Link className="btn btn-link" to="/">Home</Link>
                            <Link className="btn btn-link" to="/about">About</Link>
                            <Link className="btn btn-link" to="/shop">Shop</Link>
                            <Link className="btn btn-link" to="/contact-us">ContactUs</Link>
                        </div>
                        <div className="col-md-4">
                            <h5 className="text-white mb-4">Policies</h5>
                            <Link className="btn btn-link" to="#">Privacy Policy</Link>
                            <Link className="btn btn-link" to="#">Terms & Conditions</Link>
                            <Link className="btn btn-link" to="#">Refund Policy</Link>
                            <Link className="btn btn-link" to="#">FAQ</Link>
                        </div>
                        <div className="col-md-4">
                            <h5 className="text-white mb-4">Address</h5>
                            <p className="mb-2"><i className="fa fa-map-marker me-3"></i>A-43, Noida Sector 16</p>
                            <p className="mb-2"><i className="fa fa-envelope me-3"></i><a href="mailto:vishankchauhan@gmail.com" target='_blank' rel="noreferrer" className='text-light'>vishankchauhan@gmail.com</a></p>
                            <p className="mb-2"><i className="fa fa-phone me-3"></i><a href="tel:9873848046" className='text-light' target='_blank' rel="noreferrer">+91-9873848046</a></p>
                            <div className="d-flex pt-2">
                                <a className="btn btn-square btn-outline-light rounded-circle me-2" href="#" target='_blank' rel="noreferrer"><i
                                    className="fab fa-twitter"></i></a>
                                <a className="btn btn-square btn-outline-light rounded-circle me-2" href="#" target='_blank' rel="noreferrer"><i
                                    className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-square btn-outline-light rounded-circle me-2" href="#" target='_blank' rel="noreferrer"><i
                                    className="fab fa-youtube"></i></a>
                                <a className="btn btn-square btn-outline-light rounded-circle me-2" href="#" target='_blank' rel="noreferrer"><i
                                    className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
