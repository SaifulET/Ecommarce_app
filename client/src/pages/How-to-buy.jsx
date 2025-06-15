import Layout from "../component/layout/layout";
import { useEffect } from "react";
import FeatureStore from "../store/FeatureStore";
import LegalsDetails from "../component/features/LegalsDetails";
const HowToBuy = () => {
    
    const {LegalDetailsRequest} = FeatureStore();
    useEffect(()=>{
        (async()=>{
            await LegalDetailsRequest("howtobuy");
        })()
    },[])
    return (
        <Layout>
           <LegalsDetails></LegalsDetails> 
        </Layout>
    );
};

export default HowToBuy;