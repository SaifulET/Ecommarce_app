import { useParams } from "react-router-dom";
import ProductStore from "../store/ProductStore";
import { useEffect } from "react";
import Layout from './../component/layout/layout';
import ProductList from "../component/product/productList";


const ProductByKeyword = () => {
    const {ListByKeywordRequest}=ProductStore();
    const {keyword}=useParams();
    useEffect(()=>{
        (async()=>{
            await ListByKeywordRequest(keyword)
        })()
    },[keyword]);
    return (
        <div>
            <Layout>
                <ProductList/>
            </Layout>  
        </div>
    );
};

export default ProductByKeyword;