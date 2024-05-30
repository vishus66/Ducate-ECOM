import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import formValidations from "../../Validations/formValidations"
import Breadcrum from "../../Breadcrum"
import Sidebar from '../Sidebar'

import { updateTestimonial, getTestimonial } from "../../../Store/ActionCreators/TestimonialActionCreators"
export default function UpdateTestimonial() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        pic: "",
        message: "",
        star: 5
    })
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        message: ""
    })

    let dispatch = useDispatch()
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let navigate = useNavigate()
    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? e.target.files[0].name : e.target.value
        // let value = e.target.files?e.target.files[0]:e.target.value  //when real api is used
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: e.target.files ? "" : formValidations(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x?.length !== 0)
        if (!error) {
            dispatch(updateTestimonial({...data}))
            //when Real API is Used
            /*
            let formData = new FormData()
            formData.append("id",id)
            formData.append("name",data.name)
            formData.append("pic",data.pic)
            formData.append("star",data.star)
            formData.append("message",data.message)
            dispatch(updateTestimonial(formData))
            */
            navigate("/admin/testimonial")
        }
        else
            setShow(true)
    }
    function getAPIData() {
        dispatch(getTestimonial())
        if (TestimonialStateData.length) {
            var item = TestimonialStateData.find((x) => x.id === id)
            setData({ ...item })
        }
    }
    useEffect(() => {
        getAPIData()
    }, [TestimonialStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9">
                        <h5 className='bg-primary text-light text-center p-2'>Testimonial <button className='float-end text-light border-0' style={{ background: "none" }} onClick={() => window.history.back()}><i className='fa fa-arrow-left'></i></button></h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name<span className='text-danger'>*</span></label>
                                <input type="text" name="name" value={data.name} onChange={getInputData} placeholder="Testimonial Name" className='form-control' />
                                {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.name}</p> : ""}
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name="pic" onChange={getInputData} className='form-control' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Star</label>
                                    <input type="number" name="star" min={1} max={5} value={data.star} onChange={getInputData} className='form-control' />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Message<span className='text-danger'>*</span></label>
                                <textarea name="message" onChange={getInputData} rows="3" value={data.message} placeholder='Message...' className='form-control'></textarea>
                                {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.message}</p> : ""}
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
