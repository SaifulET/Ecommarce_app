import { useParams } from "react-router-dom";
import ProductStore from "../store/ProductStore";
import { useEffect } from "react";
import Layout from './../component/layout/layout';
import ProductList from './../component/product/productList';


const ProductByBrand = () => {
    const {ListByBrandRequest}=ProductStore();
    const {id}=useParams();
    useEffect(()=>{
        (async()=>{
            await ListByBrandRequest(id)
        })()
    },[id]);
    return (
        <div>
            <Layout>
                <ProductList/>
            </Layout>  
        </div>
    ); 
};

export default ProductByBrand;