import {CreatWishService,RemoveWishService,ReadWishService}from "../../services/wishesService.js"

export const CreateWish=async(req,res)=>{
    let data = await CreatWishService(req);
    return res.json(data);

}
export const RemoveWish=async(req,res)=>{
    let data = await RemoveWishService(req);
    return res.json(data);

}
export const ReadWish=async(req,res)=>{
    let data = await ReadWishService(req);
    return res.json(data);

}
