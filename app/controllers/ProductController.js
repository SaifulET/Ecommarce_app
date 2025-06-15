import {SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListByKeywordService,
    ReviewListService,
    ListByRemarkService,
    ListByFilterService,DetailsService} from "../../services/ProductServices.js"


export const ProductListByCategory=async(req,res)=>{
    let result= await ListByCategoryService(req)
    return res.json(result)
}
export const ProductListByRemark=async(req,res)=>{
    let result= await ListByRemarkService(req);
    return res.json(result)
}
export const ProductListByBrand=async(req,res)=>{
    let result= await ListByBrandService(req)
    return res.json(result)
}
export const ProductListBySlider=async(req,res)=>{
    let result= await SliderListService()
    return res.json(result)
}
export const ProductDetailsID=async(req,res)=>{
    let result= await DetailsService(req)
    return res.json(result)
}
export const ProductListByKeyword=async(req,res)=>{
    let result= await ListByKeywordService(req)
    return res.json(result)
}
export const ProductReviewListByID=async(req,res)=>{
    let result =await ReviewListService(req);
    return res.json(result)
}
export const CreateProductReview=async(req,res)=>{
    let result = await ReviewListService(req);
    return res.json(result)
}
export const ProductListByFilter = async (req, res) => {
    let result = await ListByFilterService(req);
    return res.status(200).json(result)
};