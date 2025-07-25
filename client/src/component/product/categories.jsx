import CategoriesSkeleton from "../../skeleton/categories_skeleton";
import ProductStore from "../../store/ProductStore";
import {Link} from 'react-router-dom';
import AnimatedLink from "../others/AnimatedLink";



const Categories = () => {
    const {CategoriesList} = ProductStore()

 
    if(CategoriesList===null){
        return (<CategoriesSkeleton/>)
    }
    else {
       return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <h1 className="headline-4 text-center my-2 p-0">Top Categories</h1>
                    <span className="bodySmal mb-5 text-center">Explore a World of Choices Across Our Most Popular <br/>Shopping Categories </span>
                    {
                        CategoriesList.map((item,i)=>{
                            return (
                                <div key={i} className="col-6 col-lg-8r text-center col-md-8r p-2">
                                    <AnimatedLink to={`ByCategory/${item['_id']}`} className="card h-100 rounded-3 bg-light">
                                        <div className="card-body">
                                            <img alt="img" className="w-75" src={item['categoryImg']} />
                                            <p className="bodySmal mt-3">{item['categoryName']}</p>
                                        </div>
                                    </AnimatedLink>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>

       )
    }
};

export default Categories;