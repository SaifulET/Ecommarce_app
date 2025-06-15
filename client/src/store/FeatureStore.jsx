import {create} from 'zustand';
import axios from 'axios';

const FeatureStore =create((set)=>({
    FeatureList:null,
    FeatureListRequest:async()=>{
        set({FeatureList:null});
        let res= await axios.get("/api/FeatureList");
        console.log("abc")
        if(res.data['status']==='success'){
            set({FeatureList:res.data['data']});
        }
    },
    LegalDetails:null,
    LegalDetailsRequest:async(type)=>{
        set({LegalDetails:null});
        let res= await axios.get("/api/LegalDetails/"+type);
        if(res.data['status']==='success'){
            console.log(res.data['data'][0]['description'])
            set({LegalDetails:res.data['data']});

        }
    },
}))


export default FeatureStore;