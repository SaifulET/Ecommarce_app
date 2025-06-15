import {create} from 'zustand';
import axios from 'axios'

const ProductStore = create((set)=>({
    BrandList:null,
    BrandListRequest:async()=>{
        let res= await axios.get("/api/BrandList");
        if(res.data['status']==='success'){
            set({BrandList:res.data['data']})
        }
    },
    CategoriesList:null,
    CategoriesListRequest:async()=>{
        let res= await axios.get("/api/CategoryList");
        if(res.data['status']==='success'){
            set({CategoriesList:res.data['data']})
        }
    },
    SliderList:null,
    SliderListRequest:async()=>{
        let res= await axios.get("/api/ProductListBySlider");
        if(res.data['status']==='success'){
            set({SliderList:res.data['data']})
        }
    },
    productList:null,
    productListRequest:async(remark)=>{
        set({productList:null})
        
        let res= await axios.get("/api/ProductListByRemark/"+remark);
        if(res.data['status']==='success'){
            set({productList:res.data['data']})
        }
    },

    ListProduct:null,
    
    ListByBrandRequest:async(BrandId)=>{
        set({ListProduct:null})
        let res= await axios.get("/api/ProductListByBrand/"+BrandId);
        if(res.data['status']==='success'){
            set({ListProduct:res.data['data']})
        }
    },
    ListByCategoryRequest:async(CategoryId)=>{
        set({ListProduct:null})
        let res= await axios.get("/api/ProductListByCategory/"+CategoryId);
        if(res.data['status']==='success'){
            set({ListProduct:res.data['data']})
        }
    },
    ListByKeywordRequest:async(keyword)=>{
       set({ListProduct:null})
        let res= await axios.get("/api/ProductListByKeyword/"+keyword);
        if(res.data['status']==='success'){
            set({ListProduct:res.data['data']})
        }
    },
    ListByFilterRequest:async(postBody)=>{
        set({ListProduct:null})
        let res=await axios.post("/api/ProductListByFilter",postBody);
        if(res.data['status']==="success")
        set({ListProduct:res.data['data']})
    },
    SearchKeyword:"",
    setSearchKeyword:async(keyword)=>{
        set({SearchKeyword:keyword})
    },
    Details:null,
    DetailsRequest:async(id)=>{
        set({Details:null})

        let res=await axios.get('/api/ProductDetailsID/'+id);
        if(res.data['status']==="success"){
            set({Details:res.data['data']})
        }
    },
    ReviewList:null,
    ReviewListRequest:async(id)=>{
        set({ReviewList:null})
        let res = await axios.get("/api/ProductReviewListByID/"+id);
        console.log(res);
        if(res.data['status']==="success"){
            console.log("abc");
            set({ReviewList:res.data['data']});
        }
        else{
            console.log("eror")
        }
    }

    


    
}))

export default ProductStore;