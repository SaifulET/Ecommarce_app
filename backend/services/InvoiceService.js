import mongoose from "mongoose"
import axios from "axios"
import CartModel from "../app/model/cartsModel.js"
import ProfileModel from "../app/model/ProfilesModel.js"
import InvoiceModel from "../app/model/invoiceModel.js"
import InvoiceProductModel from "../app/model/invoiceProductsModel.js"
import paymentSettingsModel from "../app/model/paymentSettings.js"
import form_data from "form-data";
let objectID=mongoose.Types.ObjectId



export const CreateInvoiceService=async(req)=>{
    try{
        let user_id=new objectID(req.headers.user_id)
        let user_email=req.headers.email
       
 
        let matchStage={$match:{userID:user_id}}
        let joinWithProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        let unwindProduct={$unwind:"$product"};
       
        let dataWithProduct= await CartModel.aggregate([
            matchStage,
            joinWithProduct,
            unwindProduct
        ])
        let totalPrice=0;
        let price=0;
        let qty=0;
        dataWithProduct.forEach((e)=>{
            if(e['product']['discount']){
                price=parseFloat(e['product']['discountPrice'])
            }
            else{
                price=parseFloat(e['product']['price'])
            }
            qty=e['qty'];
            totalPrice += price*parseFloat(qty)
        })
        let vatPrice= price*0.03;
        let payablePrice=vatPrice+totalPrice;



        let profile= await ProfileModel.aggregate([matchStage]);
        let cus_details=`Name:${profile[0]['cus_name']},Phone:${profile[0]['cus_phone']},City:${profile[0]['cus_city']},Address:${profile[0]['cus_add']}`
        let ship_details=`ShipName:${profile[0]['ship_name']},\nShip_phone:${profile[0]['ship_phone']},\nShip_city:${profile[0]['ship_city']},\nShip_address:${profile[0]['ship_add']}`

        let tranID=Math.floor(100000+Math.random()*90000)
        let val_id=0;
        let payment_status='pending';
        let delivery_status='pending';


        let invoice=await InvoiceModel.create({
            userID:user_id,
            payable:payablePrice,
            cus_details:cus_details,
            ship_details:ship_details,
            tran_id:tranID,
            val_id:val_id,
            payment_status:payment_status,
            delivery_status:delivery_status,
            total:totalPrice,
            vat:vatPrice,
        })
        dataWithProduct.forEach(async(e)=>{
           let InvoiceProduct=await InvoiceProductModel.create({
                productID:e['productID'],
                userID:user_id,
                invoiceID:invoice['_id'],
                qty:e['qty']
            })
        })
        
        
       

        await CartModel.deleteMany({userID:user_id});


        let paymentSettings= await paymentSettingsModel.find({});
        const formData=new form_data();
        formData.append('store_id',paymentSettings[0]['store_id']);
        
        formData.append('store_passwd',paymentSettings[0]['store_passwd']);
        formData.append('currency',paymentSettings[0]['currency']);
        formData.append('success_url',`${paymentSettings[0]['success_url']}/${tranID}`);
        formData.append('fail_url',`${paymentSettings[0]['fail_url']}/${tranID}`);
        formData.append('cancel_url',`${paymentSettings[0]['cancel_url']}/${tranID}`);
        formData.append('ipn_url',paymentSettings[0]['ipn_url']);
        formData.append('init_url',paymentSettings[0]['init_url']);

       
        formData.append('total_amount',payablePrice.toString());
        formData.append('tran_id',tranID);
        formData.append('product_category',paymentSettings[0]['init_url']);
        formData.append('product_category',paymentSettings[0]['init_url']);
       
        formData.append('cus_name',profile[0]['cus_name']);
      
        formData.append('cus_email',user_email);
  
        formData.append('cus_add1',profile[0]['cus_add']);
        formData.append('cus_add2',profile[0]['cus_add']);
        formData.append('cus_city',profile[0]['cus_city']);
        formData.append('cus_state',profile[0]['cus_state']);
        formData.append('cus_postcode',profile[0]['cus_postcode']);
        formData.append('cus_phone',profile[0]['cus_phone']);
        formData.append('cus_country',profile[0]['cus_country']);

       

        formData.append('shipping_method','YES');


        formData.append('ship_name',profile[0]['ship_name']);
        // formData.append('ship_add1',profile[0]['ship_add']);
        // formData.append('ship_add2',profile[0]['ship_add']);

        // formData.append('ship_country',profile[0]['ship_country']);
        // formData.append('ship_city',profile[0]['ship_city']);
        // formData.append('ship_postcode',profile[0]['ship_postcode']);

        formData.append('product_name','According to Invoice');
        formData.append('product_category','According to Invoice');
        formData.append('product_profile','According to Invoice');
        const SSLReq=await axios.post(paymentSettings[0]['init_url'],formData)
        





        return {status:"Success",data:SSLReq.data}

    }catch(e){
        return {status:"Fail",data:e.toString()}
    }
}

export const paymentSuccessService=async(req)=>{
try{
    let tranID=req.params.tranID
    await InvoiceModel.updateOne({tran_id:tranID},{payment_status:"success"});
    return {status:"success"}
}catch(e){
    return {status:"fail",message:e.toString() }
}
}
 
export const paymentFailService=async(req)=>{
try{
    let tranID=req.params.tranID
    await InvoiceModel.updateOne({tran_id:tranID},{payment_status:Fail});
    return {status:"Fail"}
}catch(e){
    return {status:"fail",message:e.toString() }
}
}
export const paymentCancelService=async(req)=>{
try{
    let tranID=req.params.tranID
    await InvoiceModel.updateOne({tran_id:tranID},{payment_status:'Cancel'});
    return {status:"Cancel"}
}catch(e){
    return {status:"fail",message:e.toString() }
}
}
export const paymentIpnService=async(req)=>{
try{
    let tranID=req.params.tranID;
    let status=req.body.status;
    await InvoiceModel.updateOne({tran_id:tranID},{payment_status:status});
    return {status:status}
}catch(e){
    return {status:"fail",message:e.toString() }
}
}
 
export const ReadInvoiceListService= async(req)=>{
    try{
        let user_id=new objectID(req.headers.user_id);
        let data=await InvoiceModel.find({userID:user_id})
        return {status:"Success",data:data};
    }catch(e){
        return {status:"fail",message:e.toString() }
    }
}


export const ReadInvoiceProductDetailsService=async(req)=>{
    try{
       
        let user_id=new objectID(req.headers.user_id);
        let invoiceID=new objectID(req.params.invoiceID);
        let matchStage={$match:{userID:user_id,invoiceID:invoiceID}}
        let joinWithProduct={$lookup:{
            from:"products",
            localField:"productID",
            foreignField:"_id",
            as:"product"
        }}
        let unwindProduct={$unwind:"$product"};
        let data=await InvoiceProductModel.aggregate([
            matchStage,
            joinWithProduct,
            unwindProduct
        ])
        return {status:"success",data:data}
    }catch(e){
        return {status:"fail",message:e.toString() }
    }
}