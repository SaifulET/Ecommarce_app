
import { useEffect } from 'react';
import FeatureStore from '../store/FeatureStore';
import ProductStore from '../store/ProductStore';
import Layout from './../component/layout/layout';
import Slider from '../component/product/slider';
import Features from '../component/features/features';
import Categories from '../component/product/categories';
import Products from '../component/product/products';
import Brands from '../component/product/brands';

const HomePage = () => {
    const {BrandListRequest,CategoriesListRequest,SliderListRequest, productListRequest}=ProductStore();
    const {FeatureListRequest}=FeatureStore();


    useEffect(()=>{
        (async()=>{
            await SliderListRequest();
            await CategoriesListRequest();
            await BrandListRequest();
            await FeatureListRequest();
            await productListRequest();

           
        })()
    },[]);
    return (
        <div>
            <Layout>
                <Slider/>
                <Brands/>
                <Features/>
                <Categories/>
                <Products/>   
            </Layout>
        </div>
    );
};

export default HomePage;