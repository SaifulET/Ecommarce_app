import { useEffect } from "react";
import Layout from "../component/layout/layout";
import FeatureStore from "../store/FeatureStore";
import LegalsDetails from './../component/features/LegalsDetails';

const Complain = () => {
    const {LegalDetailsRequest} = FeatureStore();
    useEffect(()=>{
        (async()=>{
            await LegalDetailsRequest("complain");
        })()
    },[])
    return (
        <Layout>
            <LegalsDetails></LegalsDetails>
        </Layout>
    );
};

export default Complain;