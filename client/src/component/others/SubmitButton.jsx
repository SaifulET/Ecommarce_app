import UserStore from "../../store/UserStore";

const SubmitButton = (props) => {
   const  {isFormSubmit}=UserStore()



    if (isFormSubmit===false){
        // eslint-disable-next-line react/prop-types
        return <button onClick={props.onClick} type="submit" className={props.className}>{props.text}</button>
    }
    else{
        // eslint-disable-next-line react/prop-types
        return <button disabled={true} className={ props.className}> <div className=" spinner-border spinner-border-sm" role="status"></div> Processing</button>
    }
    
};

export default SubmitButton;