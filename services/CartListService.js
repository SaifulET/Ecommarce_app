import CartModel from "../app/model/cartsModel.js"
import mongoose from "mongoose";
let ObjectId=mongoose.Types.ObjectId;

export const CreateCartListService=async(req)=>{
   try{
    let user_id=req.headers.user_id;
    let {productID,qty,size,color}=req.body;
    let postJson={
        productID:productID,
        userID:user_id,
        color:color,
        qty:qty,
        size:size
    }
    await CartModel.create(postJson)
    return {status:"success",message:"Cart create successfully!"}
   }catch(e){
    return {status:"fail",message:e.toString()}
   }
}

export const ReadCartListService=async(req)=>{
  try{
    let user_id=new ObjectId(req.headers.user_id);
    let MatchStage={$match:{userID:user_id}}
    let joinStageProduct={
        $lookup:{
            from:"products",
            localField:"productID",
            foreignField:"_id",
            as :"product"
        }
    }
    let unwindCart={$unwind:"$product"}
    let project={
        $project:
        {
            "productID":1,
            "_id":1,
            "qty":1,
            "color":1,
            "size":1,
            "discount":1,
            "discountPrice":1,
            "product.title":1,
            "product.stock":1,
            "product.price":1
        }}

    let data=await CartModel.aggregate([
        MatchStage,
        joinStageProduct,
        unwindCart,
        // project
    ]);
    return {status:"success",data:data};
  }catch(e){
    return {status:"fail",message:e.toString()}
  } 
}

export const UpdateCartListService=async(req)=>{
    try{
        let user_id=new ObjectId(req.headers.user_id);
        
        let {productID,qty,size,color}=req.body;
        let postJson={
            productID:productID,
            userID:user_id,
            color:color,
            qty:qty,
            size:size
        }
        await CartModel.updateOne(postJson,{$set:postJson},{upsert:true})
        return {status:"success",message:"Cart updated successfully!"}

    }catch(e){
        return {status:"fail",message:e.toString()}
    }
    
}

export const RemoveCartListService=async(req)=>{
    try{
        let user_id=(req.headers.user_id)
        let productID=req.body.productId
        let postJson={
            userID:user_id,
            productID:productID
        }
        await CartModel.deleteMany(postJson)
        return {status:"success",message:"Cart deleted successfully!"}
    }catch(e){
        return {status:"fail",message:e.toString()}
    }
}