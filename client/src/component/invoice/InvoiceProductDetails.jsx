import { useEffect, useState } from "react";
import CartStore from "../../store/CartStore";
import { useParams } from "react-router-dom";
import CartSkeleton from "../../skeleton/CartSkeleton";
import NoData from "../wish/NoData";
import {Modal} from "react-bootstrap";
import ReviewStore from "../../store/ReviewStore";
import ReviewSubmitButton from "./ReviewSubmitButton";
import ValidationHelper from './../../utility/ValidationHelper';
import { toast } from 'react-hot-toast';

const InvoiceProductDetails = () => {
    const [show,setShow]=useState(false);
    const hanleClose=()=>{setShow(false)};
    const {ReviewFormOnChange,ReviewSaveRequest,ReviewForm}=ReviewStore()

    const { InvoiceDetails,InvoiceDetailsRequest}= CartStore();
    const {id}= useParams();

    const ReviewModel=(id)=>{
        setShow(true);
        ReviewFormOnChange('productID',id);
    }
    useEffect(()=>{
        (async()=>{
            await InvoiceDetailsRequest(id)
        })()
    },[id])
    const SubmitReview= async()=>{
        console.log(ReviewForm)
        if(ValidationHelper.IsEmpty(ReviewForm.des)){
            toast.error("Review Required")
        }else{
            let res = await ReviewSaveRequest(ReviewForm)
            console.log(res)
            res?toast.success("New Review Created"):toast.error("something Went Wrong!");
            setShow(false);
        }
    }

    if(InvoiceDetails===null){
        return(
            <CartSkeleton></CartSkeleton>
        )
    }
    else if(InvoiceDetails.length===0){
        return(
            <div className="container">
                <div className="row">
                    <NoData></NoData>
                </div>
            </div>
        )
    }
    else{
        return(
            <div>
                <div className="container mt-3">
                <div className="col-md-12">
                    <div className="card p-4">
                        <ul className="list-group list-group-flush">
                            {
                                InvoiceDetails.map((item,i)=>{
                                    return( <li key={i} className="list-group-item d-flex justify-content-between align-items-start">
                                        <img src={item['product']['image']} className="rounded-1" width="90" height="auto" alt="" />
                                        <div className="ms-2 me-auto">
                                            <div className="fw-medium h6">
                                                {item['product']['title']}
                                            </div>
                                            <span>Unit Price:{item['price']} Total: {item['price']*parseInt(item['qty'])}</span>
                                            <span>Qty: {item['qty']} Color: {item['color']} Size: {item['size']}</span>
                                        </div>
                                        <button className="btn btn-success" onClick={()=>{ReviewModel(item['productID'])}}>Create Review</button>
                                    </li>

                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={hanleClose}>
                <Modal.Header closeButton>
                    <h6>Create Review</h6>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 p-2">
                                <label className="form-label">Rating</label>
                                <select onChange={(e)=>ReviewFormOnChange('rating',e.target.value)} className="form-select">

                                    <option>Give rating</option>
                                    <option value="5">5 star</option>
                                    <option value="4">4 star</option>
                                    <option value="3">3 star</option>
                                    <option value="2">2 star</option>
                                    <option value="1">1 star</option>
                                </select>
                            </div>
                            <div className="col-12 p-2">
                                <label htmlFor="" className="form-label">Review</label>
                                <textarea onChange={(e)=>{ReviewFormOnChange('des',e.target.value)}} className="form-control" rows={7} ></textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-dark" onClick={hanleClose}>Close</button>
                    <ReviewSubmitButton text="Submit" className="btn btn-success" onClick={SubmitReview}></ReviewSubmitButton>
                </Modal.Footer>
            </Modal>
            </div>
        )
    }



    
};

export default InvoiceProductDetails;