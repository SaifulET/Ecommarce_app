import WishListStore from "../../store/WishListStore";

const WishSubmitButton = (props) => {
   const {isWishSubmit} = WishListStore();
   if(isWishSubmit===false){
    return <button className={props.className} onClick={props.onClick}>{props.text}</button>
   }
   else{
    return <button disabled={true} className={props.className}><div className='spinner-border spinner-border-sm' role="status"></div> Processing</button>
   }
};

export default WishSubmitButton;