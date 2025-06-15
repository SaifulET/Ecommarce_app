
import { useParams } from "react-router-dom";
import ProductStore from "../store/ProductStore";
import { useEffect } from "react";
import Layout from './../component/layout/layout';
import ProductList from "../component/product/productList";


const ProductByCategory = () => {
    const {ListByCategoryRequest}=ProductStore();
    const {id}=useParams();
    useEffect(()=>{
        (async()=>{
            await ListByCategoryRequest(id)
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

export default ProductByCategory;