import { create } from "zustand"
import { unauthorized } from "../utility/utility";
import  axios  from 'axios';


const ReviewStore=create((set)=>({
    isReviewSubmit:false,
    ReviewForm:{"des":"", rating:"", "productID" : ""},
    ReviewFormOnChange:(name,value)=>{
        set((state)=>({
            ReviewForm:{
                ...state.ReviewForm,
                [name]:value
            }
        }))
    },
    ReviewSaveRequest:async(PostBody)=>{
        try{
            set({isReviewSubmit:true})
            let res= await axios.post('/api/CreateReview',PostBody,{withCredentials:true})
            set(() => ({
        ReviewForm: {
            des: '',
            rating: '',
            productID: '',
      },
    }))
            return res.data['status']=== 'success'
        }catch(e){
            unauthorized(e.response.status)
        }finally{
            set({isReviewSubmit:false})
        }
    }
}))
export default ReviewStore;