import SubmitButton from "../others/SubmitButton";
import ValidationHelper from './../../utility/ValidationHelper';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import UserStore from "../../store/UserStore";
import ReactCodeInput from 'react-code-input';


const OtpForm = () => {
    const otpInputStyle = {
  width: '50px',
  height: '50px',
  fontSize: '24px',
  borderRadius: '8px',
  border: '1px solid #ced4da',
  textAlign: 'center',
  margin: '0 5px',
};

    const {OtpFormData,VerifyLoginRequest,OtpOnChange}=UserStore()
    const navigate = useNavigate()
    const onFormSubmit = async() =>{
        if(ValidationHelper.IsEmpty(OtpFormData.otp)){ 
            toast.error("valid Otp required!")
        }
        else{
            let res = await VerifyLoginRequest(OtpFormData.otp)
            res? navigate("/"): toast.error("Wrong Otp! ")
        }
    }
    return (
        <div>
            <div className="container section">  
                <div className="row d-flex justify-content-center">  
                    <div className="col-md-5">  
                        <div className="card p-5">  
                            <h4>Enter Verification Code</h4>  
                            <p>A verification code has been sent to the email address you provide</p>
                                <ReactCodeInput type="tel" fields={6} value={OtpFormData.otp} onChange={(value) => OtpOnChange('otp', value)} inputMode="numeric" inputStyle={otpInputStyle}/>
                            <SubmitButton onClick={onFormSubmit} className="btn mt-3 btn-success" text="Submit"/>  
                        </div>  
                    </div>  
                </div>  
            </div>
        </div>
    );
};

export default OtpForm;