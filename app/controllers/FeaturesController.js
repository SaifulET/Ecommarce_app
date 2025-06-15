import { CreateLegalService, FeaturesListService,LegalDetailsService } from "../../services/FeaturesService.js";
export const CreateLegalDetails=async(req,res)=>{
     let data=await CreateLegalService(req);
        res.json(data);
}
export const LegalDetails=async(req,res)=>{
    let data=await LegalDetailsService(req);
    res.json(data);
}
export const FeatureList=async(req,res)=>{
    let data=await FeaturesListService(req);
    res.json(data);
}
