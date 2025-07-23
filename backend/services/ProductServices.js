import BrandModel from "../app/model/brandsModel.js"
import CategoryModel from "../app/model/CategoriesModel.js"
import ProductSliderModel from "../app/model/slidersModel.js"
import ProductModel from "../app/model/ProductsModel.js"
import ReviewModel from "../app/model/reviewsModel.js"
import mongoose from "mongoose"
const ObjectId =mongoose.Types.ObjectId;
export const BrandListService=async()=>{
    try{
        let data= await BrandModel.find({})
        return {status:"success",data:data}
    }
    catch(e){
        return {status:"fail",data:e.toString()}
    }
}


export const CategoryListService=async()=>{
    try{
        let data= await CategoryModel.find({})
        return {status:"success",data:data}
    }
    catch(e){
        return {status:"fail",data:e.toString()}
    }
}


export const SliderListService=async()=>{
    try{
        let data= await ProductSliderModel.find({})
        return {status:"success",data:data}
    }
    catch(e){
        return {status:"fail",data:e.toString()}
    }
}


export const ListByBrandService=async(req)=>{
    try{
       let BrandID= new ObjectId(req.params.BrandID);
       let MatchStage={$match:{brandID:BrandID}}

       let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
       let joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}

       let UnwindBrandStage={$unwind:"$brand"}
       let UnwindCategoryStage={$unwind:"$category"}

       let projectionStage={$project:{"brand_id":0,"category_id":0,"categoryID":0,"brandID":0}};

       let data= await ProductModel.aggregate([
        MatchStage,
        
        joinWithCategoryStage,
        joinWithBrandStage,
        UnwindBrandStage,
        UnwindCategoryStage,
        projectionStage
       ])
       return {status:"success",data:data}

    }
    catch(e){
        return {status:"fail",data:e.toString()}
    }

}


export const ListByCategoryService=async(req)=>{
    try{
        let CategoryID= new ObjectId(req.params.CategoryID);
        let MatchStage={$match:{categoryID:CategoryID}}
 
        let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
 
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
 
        let projectionStage={$project:{"brand_id":0,"category_id":0,"categoryID":0,"brandID":0}};
 
        let data= await ProductModel.aggregate([
         MatchStage,
         joinWithBrandStage,
         joinWithCategoryStage,
         UnwindBrandStage,
         UnwindCategoryStage,
         projectionStage
        ])
        return {status:"success",data:data}
 
     }
     catch(e){
         return {status:"fail",data:e.toString()}
     }
}


export const ListByRemarkService=async(req)=>{
    try{
       let Remark= req.params.remark;
       let MatchStage={$match:{remark:Remark}}
        let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
 
        let projectionStage={$project:{"categoryID":0,"brandID":0}};
 
        let data= await ProductModel.aggregate([
         MatchStage,
         joinWithBrandStage,
         joinWithCategoryStage,
         UnwindBrandStage,
         UnwindCategoryStage,
         projectionStage
        ])
        return {status:"success",data:data}
 
 
    }
    catch(e){
        return {status:"fail",data:e.toString()}
    }
}


export const ListByKeywordService=async(req)=>{
    try{
        let SearchRegex={"$regex":req.params.keyword,"$options":"i"};
        let SearchParams=[{title:SearchRegex},{shortDes:SearchRegex}]
        let SearchQuery={$or:SearchParams};

        let MatchStage={$match:SearchQuery};

        let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let projectionStage={$project:{"brand_id":0,"category_id":0,"categoryID":0,"brandID":0}};
        let data= await ProductModel.aggregate([
            MatchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            projectionStage
           ])
           return {status:"success",data:data}

    }
    catch(e){
        return {status:"fail",data:e.toString()}
    }
}


export const DetailsService=async(req)=>{
    try{
       let ProductID=new ObjectId(req.params.productID);
       let MatchStage={$match:{_id:ProductID}};

      const joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        const joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        const joinWithdetailsStage={$lookup:{from:"productdetails",localField:"_id",foreignField:"productID",as:"details"}}
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let UnwinddetailStage={$unwind:"$details"}
 
        let projectionStage={$project:{"brand_id":0,"category_id":0,"categoryID":0,"brandID":0}};
 
        let data= await ProductModel.aggregate([
         MatchStage,
         joinWithBrandStage,
         joinWithCategoryStage,
         joinWithdetailsStage,
        
         UnwindBrandStage,
         UnwindCategoryStage,
         UnwinddetailStage,
        //  projectionStage
        ])
        return {status:"success",data:data}
    }
    catch(e){
        return {status:"fail",data:e.toString()}
    }
}


export const ReviewListService=async(req)=>{
    try{
        let ProductId=new ObjectId(req.params.productID);
        // let MatchStage={$match:{productID:ProductId}};
        const MatchStage = {
  $match: {
    productID: ProductId,
    rating: { $ne: "" },
    des: { $ne: "" }
  }
};

        const joinWithProfileStage={$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}}
        const unwindProfileStage={$unwind:"$profile"};

        let projectionStage={$project:{'des':1,'rating':1,'profile.cus_name':1}};
        let data=await ReviewModel.aggregate([
            MatchStage,
            joinWithProfileStage,
            unwindProfileStage,
            projectionStage
        ])
        console.log(data)
        return {status:"success",data:data}
        
    }
    catch(e){
        return {status:"fail",data:e.toString()}
    }
}

export const ListByFilterService = async (req) => {
    try {
    let MatchConditions = {};
    if (req.body['categoryID']) {
    MatchConditions.categoryID = new ObjectId(req.body["categoryID"]);
    }
    if (req.body['brandID']) {
         MatchConditions.brandID= new ObjectId(req.body['brandID']);
    }
   
    let MatchStage ={ $match: MatchConditions };

    let AddFieldStage = {
        $addFields: { numericPrice: { $toInt: "$price" } }
    };
    
    let priceMin = parseInt(req.body['priceMin']);
    let priceMax = parseInt(req.body['priceMax']);
    let PriceMatchConditions = {};
    
    if (!isNaN(priceMin)) {
        PriceMatchConditions['numericPrice'] = { $gte: priceMin };
    }
    
    if (!isNaN(priceMax)) {
        PriceMatchConditions['numericPrice'] = { 
            ...(PriceMatchConditions['numericPrice'] || {}), 
            $lte: priceMax
        };
    }
    
    let PriceMatchStage = { $match: PriceMatchConditions };
    const joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
    const joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
    let UnwindBrandStage={$unwind:"$brand"}
    let UnwindCategoryStage={$unwind:"$category"}
   
   
    let data = await ProductModel.aggregate([
        MatchStage,
        AddFieldStage,
        PriceMatchStage,
        joinWithBrandStage,
        joinWithCategoryStage,
        UnwindBrandStage,
        UnwindCategoryStage,
        // ProjectionStage
    ]);
    return { status: "success", data: data };  




    }catch(e){
        return { status: "fail", data: e.toString() };
    }

}