import WishModel from "../app/model/wishesModel.js"
import mongoose from "mongoose"
let ObjectId=mongoose.Types.ObjectId;

export const CreatWishService=async(req)=>{
   try{
    let user_id= req.headers.user_id;
    let productID=req.body.productID;

    let postJson={
        userID:user_id,
        productID:productID
    }
    await WishModel.updateOne(postJson,{$set:postJson},{upsert:true});
    return {status:"success",data:"wishList created"}


   }catch(e){
    return {status:"fail",data:e.toString()}
   }
}

export const RemoveWishService=async(req)=>{
    try{
        let user_id= req.headers.user_id;
        let productID=req.body.productID;
    
        let postJson={
            userID:user_id,
            productID:productID
        }
        await WishModel.deleteOne(postJson);
        return {status:"success",data:"wishList Deleted"}
    
    
       }catch(e){
        return {status:"fail",data:e.toString()}
       }
}

export const ReadWishService=async(req)=>{
    try{
        let user_id= new ObjectId(req.headers.user_id);
        let matchStage={$match:{userID:user_id}};
        let joinStageProduct={
            $lookup:{
                from:"products",
                localField:"productID",
                foreignField:"_id",
                as :"product"
            }
        }
        let unwindProduct={$unwind:"$product"}
        let data= await WishModel.aggregate([
            matchStage,
            joinStageProduct
            // unwindProduct
        ])
        
        return {status:"success",data:data}
    
    
       }catch(e){
        return {status:"fail",data:e.toString()}
       }

}