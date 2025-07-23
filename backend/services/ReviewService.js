import mongoose from 'mongoose'
let ObjectId=mongoose.Types.ObjectId;
import ReviewModel from '../app/model/reviewsModel.js';


export const CreateReviewService=async(req)=>{
    try{
        let user_id=new ObjectId(req.headers.user_id);
        let reqBody=req.body;
        let data=await ReviewModel.create({
            userID:user_id,
            productID:new ObjectId(reqBody.productID),
            des:reqBody.des,
            rating:reqBody.rating
        })
        console.log(data)
        return {status:'success',data:data}
    }catch(e){
        return {status:'fail',data:e.toString()}
    }
}

export const ReadReviewService=async(req)=>{
    try{
        let productID=req.params.productID;
        let data= await ReviewModel.find({productID:productID});
        console.log(data)
        return {status:'success',data:data}
    }catch(e){
        return {status:'fail',data:e.toString()}
    }
}