import {create} from 'zustand';
import axios from 'axios';
import { unauthorized } from '../utility/utility';

const CartStore = create((set)=>({
    isCartSubmit:false,
    CartForm:{color:"",size:""},
    CartFormChange:(name,value)=>{
        set((state)=>({
            CartForm:{
                ...state.CartForm,
                [name]:value
            }
        }))
    },
    CartSaveRequest:async(postBody,productID,quantity)=>{
        try{
        set({isCartSubmit:true})
        postBody.productID=productID;
        postBody.qty=quantity;
        let res= await axios.post('/api/UpdateCart',postBody,{
  withCredentials: true,
})
        return res.data['status']==="success"
        }catch(e){
            unauthorized(e.response.status);
        }finally{
            set({isCartSubmit:false})
        }
    },

    CartList:null,
    CartCount:0,
    CartTotal:0,
    CartTotalVAT:0,
    CartPayable:0,
    CartListRequest:async()=>{
        try{
        let res= await axios.get("/api/ReadCartList",{
        withCredentials: true,
        });
        if(res.data['status']==="success"){
            set({CartList:res.data['data']})
            set({CartCount:res.data['data'].length});  
            let payable=0;
            let total=0;
            let vat=0;
          

            res.data['data'].forEach((item,i) => {
            
            if(res.data['data'][i]['product']['discount']===true){
                total= total+ parseInt(item['qty'])*parseInt(item['product']['discountPrice'])
            }
            else{
                total=total+parseInt(item['qty'])*parseInt(item['product']['price']);
            }
            vat=total*0.05;
            payable=total+vat;
            set({CartTotal:total})
            set({CartTotalVAT:vat})
            set({CartPayable:payable});
            console.log(total);
        });
        


        }
        else{
            console.log(res.data)
        }
        
        
        }catch(e){
            // unauthorized(e.response.status)
            console.log(e)
        }   
    },
    RemoveCartListRequest:async(CartID)=>{
    try{
        set({CartList:null});
        console.log(CartID)
       let res= await axios.post('/api/RemoveCart',{"productId":CartID},{withCredentials: true,})
       console.log(res)

    }catch(e){
        // unauthorized(e.response.status);
        console.log(e)
    }    
    },
    CreateInvoiceRequest:async()=>{
        try{
            set({isCartSubmit:true})
            let res = await axios.get('/api/CreateInvoice',{withCredentials: true,})
            window.location.href= res.data['data']['GatewayPageURL'];

        }catch(e){
            // unauthorized(e.response.status)
            console.log(e)
        }finally{
            set({isCartSubmit:false})
        }
    },

    InvoiceList:null,
    InvoiceListRequest:async()=>{
        try{
            set({InvoiceList:null})
        let res= await axios.get('/api/ReadInvoiceList' ,{withCredentials: true,})
        console.log(res.data['data'].length)
        set({InvoiceList:res.data['data']});
        }catch(e){
            console.log(e)
            // unauthorized(e.response.status);
        }

    },
    InvoiceDetails:null,
    InvoiceDetailsRequest:async(id)=>{
        try{
            let res= await axios.get('/api/ReadInvoiceProductDetails/'+id,{withCredentials:true});
            set({InvoiceDetails:res.data['data']});
            console.log(res)
        }
        catch(e){
            unauthorized(e.response.status)
        }
    }
    
}))
export default CartStore;
