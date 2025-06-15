import Layout from './../component/layout/layout';
import { useEffect } from "react";
import FeatureStore from "../store/FeatureStore";
import LegalsDetails from '../component/features/LegalsDetails';
const Term = () => {
    const {LegalDetailsRequest} = FeatureStore();
    useEffect(()=>{
        (async()=>{
            await LegalDetailsRequest("term");
        })()
    },[])
    return (
        <Layout>
            <LegalsDetails></LegalsDetails>
        </Layout>
    );
};

export default Term;