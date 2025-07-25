/* eslint-disable react/jsx-key */
import BrandSkeleton from "../../skeleton/brands_skeleton";
import ProductStore from "../../store/ProductStore";
import {Link} from 'react-router-dom'

const Brands = () => {
const {BrandList} = ProductStore();
if(BrandList == null){
    return <BrandSkeleton/>
}
else {
    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <h1 className="headline-4 text-center my-2 p-0">Top Brands</h1>
                    <span className="bodySmall mb-5 text-center">Explore a World of Choices Across Our Most Popular <br/>Shopping Categories </span>
                    {
                        BrandList.map((item,i)=>{
                            return (
                                <div key={i}className="col-12 col-lg-8r text-center col-md-8r p-2">
                                    <Link to={`/ByBrand/${item['_id']}`} className="card h-100 rounded-3 bg-white">
                                    <div className="card-body mt-3">
                                     <img className="w-75 " src={item['brandImg']} />
                                        <p className="bodySmall">{item['brandName']} </p>
                                    </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
};

export default Brands;