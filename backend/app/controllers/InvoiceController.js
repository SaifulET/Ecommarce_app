import {ReadInvoiceProductDetailsService,ReadInvoiceListService,CreateInvoiceService, paymentSuccessService,paymentCancelService,paymentFailService,paymentIpnService}from "../../services/InvoiceService.js"


export const CreateInvoice=async(req,res)=>{
    let data=await CreateInvoiceService(req);
    res.json(data);
}
export const PaymentSuccess=async(req,res)=>{
    let data=await paymentSuccessService(req);
    res.json(data);
}
export const PaymentFail=async(req,res)=>{
    let data=await paymentFailService(req);
    res.json(data);
}
export const PaymentCancel=async(req,res)=>{
    let data=await paymentCancelService(req);
    res.json(data);
}
export const PaymentIpn=async(req,res)=>{
    let data=await paymentIpnService(req);
    res.json(data);
}


export const ReadInvoiceList=async(req,res)=>{
    let data = await ReadInvoiceListService(req);
    res.json(data);
}
export const ReadInvoiceProductDetails=async(req,res)=>{
   
    let data = await ReadInvoiceProductDetailsService(req);
    res.json(data);
}





