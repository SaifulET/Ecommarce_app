import {
    CreateCartListService,
    ReadCartListService,
    UpdateCartListService,
    RemoveCartListService} from "../../services/CartListService.js"

export const CreateCartList=async(req,res)=>{
    let data=await CreateCartListService(req);
     
    return res.json(data);
}
export const ReadCartList=async(req,res)=>{
    let data=await ReadCartListService(req)
    return res.json(data);
}
export const UpdateCartList=async(req,res)=>{
    let data=await UpdateCartListService(req)
    return res.json(data);
}
export const RemoveCartList=async(req,res)=>{
    let data=await RemoveCartListService(req)
    return res.json(data);
}