import React from 'react';
import ReviewStore from '../../store/ReviewStore';

const ReviewSubmitButton = (props) => {
   let {isReviewSubmit} = ReviewStore()
    if(isReviewSubmit===false){
        return(
            <button onClick={props.onClick} type="submit" className={props.className}>{props.text}</button>
        )
    }
    else{
        return(
            <button disabled={true}onClick={props.onClick} className={props.className}><div className='spinner-border spinner-border-sm' role="status"></div> Processing</button>
        )
    }
};

export default ReviewSubmitButton;