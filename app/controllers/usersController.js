
import {loginService,VerifyLoginService,CreateUserProfileService,UpdateUserProfileService,ReadUserProfileService} from "../../services/UserServices.js"

export const login=async(req,res)=>{
    let result= await loginService(req)
    return res.json(result);

}



export const VerifyLogin=async(req,res)=>{
    try{
        let result= await VerifyLoginService(req)
        
        if(result['status']==='success'){
            let cookieOption= {expires:new Date(Date.now()+24*6060*1000),httpOnly:false}
            res.cookie('token',result['token'])
            return res.json(result);
        }
        else{
        return res.json({status:"fail","Message":"token not setting"});
        }
        
        
    }
    catch(e){
        return res.json({status:"fail","Message":e.toString()});
    }

}

export const CreateUserProfile=async(req,res)=>{
    try{
        let result= await CreateUserProfileService(req)
        return res.json({status:"success","Message":result});
    }
    catch(e){
        return res.json({status:"fail","Message":e.toString()});
    }

}

export const UpdateUserProfile=async(req,res)=>{

    try{
        let result= await UpdateUserProfileService(req)
        return res.json({status:"success","Message":result});
    }
    catch(e){
        return res.json({status:"fail","Message":e.toString()});
    }

}

export const ReadUserProfile=async(req,res)=>{
const token = req.cookies.token;
    try{
        let result= await ReadUserProfileService(req)
        return res.json({status:"success","Message":result});
    }
    catch(e){
        return res.json({status:"fail","Message":e.toString()});
    }

}

export const UserLogout=(req,res)=>{
    try{
    return res.status(200).json({status:"success" });
    }catch(e){
        return res.status(400).json({status:e.toString()});
    }
}