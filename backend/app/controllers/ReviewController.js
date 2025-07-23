import {ReadReviewService, CreateReviewService } from "../../services/ReviewService.js";



export const createReview=async(req,res)=>{
    let data=await CreateReviewService(req);
    res.json(data);
}


export const ReadReview=async(req,res)=>{
    let data=await ReadReviewService(req);
    res.json(data);
}

