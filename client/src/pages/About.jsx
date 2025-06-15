import { useEffect } from "react";
import Layout from "../component/layout/layout";
import FeatureStore from "../store/FeatureStore";
import LegalsDetails from "../component/features/LegalsDetails";

const About = () => {
    const {LegalDetailsRequest} = FeatureStore();
    useEffect(()=>{
        (async()=>{
            await LegalDetailsRequest("about");
        })()
    },[])
    return (
        <Layout>
          <LegalsDetails></LegalsDetails>  
        </Layout>
    );
};

export default About;