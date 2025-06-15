/* eslint-disable react/jsx-key */

import ProductStore from "../../store/ProductStore";
import ProductsSkeleton from "../../skeleton/products_skeleton";
import {Link} from "react-router-dom"
import StarRatings from "react-star-ratings/build/star-ratings.js"
import { useEffect, useState } from "react";

const ProductList = () => {
    // const {ListProduct}=ProductStore();
    const {ListProduct, BrandListRequest, BrandList, CategoriesList,ListByFilterRequest, CategoriesListRequest}=ProductStore();
    let [filter,setFilter]=useState({brandID:"",categoryID:"",priceMax:"",priceMin:""})    
    const inputOnchange=async(name,value)=>{
        setFilter((data)=>({
            ...data,
            [name]:value
        }))
    }
    useEffect( () => {
        (async ()=>{
        BrandList ===null?await BrandListRequest():null;
        CategoriesList===null?await CategoriesListRequest():null;
        let isEveryPropertyEmpty=Object.values(filter).every(value=>value==="");
        !isEveryPropertyEmpty?await ListByFilterRequest(filter):null;
        })()
    },[filter])
        return (
            <div className="container mt-2">
            <div className="row">
                <div className="col-md-3 p-2">
                    <div className="card vh-100 p-3 shadow-sm">
                        <label className="form-label mt-3">Brands</label>
                        <select value={filter.brandID} onChange={async(e)=>{await inputOnchange("brandID",e.target.value)}} className="form-control form-select">
                            <option value="">Choose Brand</option>
                            {BrandList!=null?(
                                BrandList.map((item)=>{
                                    return (<option value={item['_id']}>{item['brandName']}</option>)
                                })
                            ):<option></option>}
                        </select>
                        <label className="form-label mt-3">Categories</label>
                        <select value={filter.categoryID} onChange={async(e)=>{await inputOnchange("categoryID",e.target.value)}} className="form-control form-select">
                            <option value="">Choose Category</option>
                            {CategoriesList!=null?(
                                CategoriesList.map((item)=>{
                                    return (<option value={item['_id']}>{item['categoryName']}</option>)
                                })
                            ):<option></option>}
                        </select>
                        <label className="form-label mt-3">Maximum Price ${filter.priceMax}</label>
                        <input value={filter.priceMax} onChange={async(e)=>{await inputOnchange("priceMax",e.target.value)}}  min={0} max={1000000} step={1000} type="range" className="form-range" />

                        <label className="form-label mt-3">Minimum Price ${filter.priceMin}</label>
                        <input value={filter.priceMin} onChange={async(e)=>{await inputOnchange("priceMin",e.target.value)}}  min={0} max={1000000} step={1000} type="range" className="form-range" />
                    </div>
                </div>
                <div className="col-md-9 p-2">
                    <div className="container">
                        <div className="row">
                        {
                            ListProduct===null?(<ProductsSkeleton/>):(
                                <div className="container">
                                    <div className="row">
                                        {
                                            ListProduct.map((item)=>{
                                                let price=<p className="bodyMedium  text-dark my-1">Price: ${item['price']} </p>
                                                if(item['discount']===true){
                                                    price=<p className="bodyMedium  text-dark my-1">Price:<strike> ${item['price']} </strike> ${item['discountPrice']} </p>
                                                }
                                                return(
                                                    <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                                        <Link to={`/details/${item['_id']}`} className="card shadow-sm h-100 rounded-3 bg-white">
                                                            <img className="w-100 rounded-top-2"style={{ width: '200px', height: '150px' }}  src={item['image']}/>
                                                                <div className="card-body">
                                                                    <p className="bodySmall text-secondary my-1">{item['title']}</p>
                                                                        {price}
                                                                        <StarRatings rating={parseFloat(item['star'])} starRatedColor="red" starDimension="15px" starSpacing="2px"/>
                                                                </div>
                                                                </Link>
                                                                </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;