import  { useEffect } from 'react';
import { Link } from 'react-router-dom';
import WishListStore from '../../store/WishListStore';
import StarRatings from 'react-star-ratings';
import ProductsSkeleton from './../../skeleton/products_skeleton';
import NoData from './NoData';

const WishListPage = () => {
    const {WishListRequest,WishList,RemoveWishListRequest}= WishListStore()

    useEffect(()=>{
        (async()=>{
            await WishListRequest()
        })()
    },[])
    const RemoveWish=async(productID)=>{
        await RemoveWishListRequest(productID)
        await WishListRequest();
    }


    if(WishList===null){
        return (
            <div className='container'>
                <ProductsSkeleton></ProductsSkeleton>
            </div>
            
        )
    }
    else if(WishList.length===0){
        return (
            <div className='container'>
                <div className='row text-center mt-3'>
                    <NoData></NoData>
                </div>
            </div>
        )
    }
    else{
        return (<div className="container">
                    <div className='row'>
                    {WishList.map((item,i)=>{
                    let price = <p className="bodyMedium text-dark my-1">Price: ${item['product']['0']['price']} </p>;
                      if(item['product']['0']['discount']===true){
                        price = <p className="bodyMedium text-dark my-1">Price: <strike>${item['product']['0']['price']}</strike> ${item['product']['0']['discountPrice']}  </p>;
                        }                                  // eslint-disable-next-line react/jsx-key
                                return(<div key={i} className="col-md-3 p-3 col-lg-4 col-sm-6 col-12 mx-auto">
                                            <div className="card shadow-sm h-100 rounded-3 bg-white">
                                                <img className="w-100 h-50 border-dark rounded-top-2 "  src={item['product']['0']['image']} />
                                                <div className="card-body">
                                                    <p className="bodySmall text-secondary my-1">{item['product']['0']['title']}</p>
                                                        {price}
                                                    <StarRatings rating={4} starRatedColor="red" starDimension="15px" starSpacing="2px" />
                                                    <p className='mt-3'>
                                                        <button onClick={async()=>{await RemoveWish(item['productID'])}} className="btn btn-outline-success btn-sm">Remove</button>
                                                        <Link className='btn mx-2 btn-outline-success btn-sm' to={`/details/${item['productID']}`}>Details</Link>
                                        
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                            )
            })}
                    </div>
        
        </div>
                
        )
    }
};

export default WishListPage;