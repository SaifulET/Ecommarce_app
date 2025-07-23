import UserModel from "../app/model/usersModel.js";
import ProfileModel from "../app/model/ProfilesModel.js"
import {TokenEncode} from "../app/utility/tokenUtility.js";
import SendEmail from './../app/utility/emailUtility.js';

export const loginService=async(req)=>{
    try{
       let {email}=req.body;
       let code=Math.floor(10000+Math.random()*900000)
       let EmailText="Your Verification Code is "+code;
       let EmailSubject="Email Verification"
       let isUser= await UserModel.findOne({email:email});
       if(isUser){
        await SendEmail(email,EmailText,EmailSubject)
        await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})
        return {status:"success",data:"6 Digit Code sent"};
       }
       else{
        return {status:"fail",data:"User not found"}
       }
    //    await SendEmail(email,EmailText,EmailSubject)
       
    }
    catch(e){
        return {status:"fail",data:e.toString()}
    }
}
export const VerifyLoginService=async(req)=>{
    try{
        let email=req.body.email;
        let otp=req.body.otp;
        let total=await UserModel.find({email:email,otp:otp});
        if(total.length==1){
            let user_id=await UserModel.find({email:email,otp:otp}).select('_id');
            let token=TokenEncode(email,user_id[0]['_id'].toString())
            await UserModel.updateOne({email:email},{$set:{otp:"0"}})
            return {status:"success",message:"Valid otp",token:token}
        }
        else{
            return {status:"fail",data:"Invalid token"}
        }
    }
    catch(e){
        return {status:"fail",data:e.toString()}
    }
}
export const CreateUserProfileService=async(req)=>{
    try{
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
        return {status:"success",data:"profile created success"};
    }
    catch(e){
        return {status:"fail",data:e.toString()}
    }
}
export const UpdateUserProfileService=async(req)=>{
    try{
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.UserID=user_id;
        await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
        return {status:"success",data:"profile updated success"};
  
    }
    catch(e){
        return {status:"fail",data:e.toString()}
    }
}
export const ReadUserProfileService=async(req)=>{
    try{
       let user_id=req.headers.user_id;
       let data = await ProfileModel.findOne({userID:user_id});
        return {status:"success",data:data}
    }
    catch(e){
        return {status:"fail",data:e.toString()}
    }
}