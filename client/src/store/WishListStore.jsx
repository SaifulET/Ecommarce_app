import axios from 'axios';
import { create } from 'zustand';
import { unauthorized } from '../utility/utility';

const WishListStore = create((set)=>({
    isWishSubmit:false,
    wishSaveRequest:async(productID)=>{
        try{
            set({isWishSubmit:true});
            let res= await axios.post('/api/CreateWish',{productID:productID},{
  withCredentials: true,
});
            return res.data['status']==='success'
        }catch(e){
            console.log(e)
            unauthorized(e.response.status)
        }finally{
            set({isWishSubmit:false})
        }
    },
    WishList:null,
    WishCount:0,
    WishListRequest:async()=>{
        try{
            let res= await axios.get("/api/ReadWish",{
            withCredentials: true,
            })
            console.log(res)
            if(res.data['status']==='success'){
                set({WishList:res.data['data']})
                set({WishCount:res.data['data'].length})
            }
            else{
            console.log(res)
            }
        }catch(e){
            console.log(e)
            unauthorized(e.response.status)
        }
    },
    RemoveWishListRequest:async(productID)=>{
        try{
            let res= await axios.post('/api/RemoveWish',{productID:productID},{withCredentials: true,})
             return res.data['status']==='success'
        }catch(e){
            console.log(e);
        }
    }


}))

export default WishListStore;