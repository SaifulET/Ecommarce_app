import ProductStore from '../../store/ProductStore';
import StarRatings from "react-star-ratings/build/star-ratings.js"

const ProductReview = () => {
    const {ReviewList}=ProductStore();
    return (
        <div>
            
        <ul className="list-group list-group-flush m-0 p-0">
                {ReviewList!==null?(ReviewList.map((item,i)=>{
                   return(
                    <li key={i} className='list-group-item bg-transparent'>
                        <h5 className="m-0 p-0"><i className='bi bi-person'></i>{item['profile']['cus_name']}</h5>
                        <StarRatings rating={parseFloat(item['rating'])} starRatedColor="red" starDimension="15px" starSpacing="2px"/>
                        <p>{item['des']}</p>
                   </li>
                   )
            })):(<span>No data</span>)}
        </ul>
        </div>
    );
};

export default ProductReview;