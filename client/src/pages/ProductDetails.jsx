
import { useParams } from 'react-router-dom';
import Details from '../component/product/Details';
import ProductStore from '../store/ProductStore';
import Layout from './../component/layout/layout';
import Brands from './../component/product/brands';
import { useEffect } from 'react';

const ProductDetails = () => {
    const {DetailsRequest,BrandListRequest,ReviewListRequest,BrandList} = ProductStore();
    const {id} =useParams();

    useEffect(()=>{
        (async()=>{
           await DetailsRequest(id)
           await ReviewListRequest(id)
           BrandList===null?await BrandListRequest():null;

        })()
    },[])

    return (
        <div>
            <Layout>
                <Details/>
                <Brands/>
            </Layout>
        </div>
    );
};

export default ProductDetails;