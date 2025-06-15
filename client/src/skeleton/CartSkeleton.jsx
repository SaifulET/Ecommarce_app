import Lottie  from 'lottie-react';
import Skeleton  from 'react-loading-skeleton';
import images from '../assets/images/image.json'


const CartSkeleton = () => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                <div className="card p-3">
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex align-items-start">
                        <Lottie 
                        style={{width: "100px"}} 
                        animationData={images} 
                        loop={true} 
                        />
                        <Skeleton count={3} style={{width: "280px"}} />
                    </li>
                    </ul>
                </div>
                </div>
            </div>
</div>

    );
};

export default CartSkeleton;