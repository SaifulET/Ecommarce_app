
import LegalDetailsSkeleton from '../../skeleton/LegalDetailsSkeleton';
import FeatureStore from './../../store/FeatureStore';
import parse from "html-react-parser";
const LegalsDetails = () => {
    const {LegalDetails} =FeatureStore()
    if(LegalDetails===null){
        return <LegalDetailsSkeleton/>
    }
    else{
        return (
            <div className='container mt-5'>
                <div className='row '>
                    <div className='col-md-12'>
                        <div className='card p-4 fs-5'>
                            {parse(LegalDetails[0]['description'])}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    
};

export default LegalsDetails;