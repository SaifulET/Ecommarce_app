/* eslint-disable react/jsx-key */
import FeaturesSkeleton from "../../skeleton/features_skeleton";
import FeatureStore from "../../store/FeatureStore";


const Features = () => {
    const {FeatureList}=FeatureStore();
    if(FeatureList===null){
     return   <FeaturesSkeleton/>
    }
   else{
    return(
        <div className="container section">
            <div className="row">
            <h1 className="headline-4 text-center my-2 p-0">Top Features</h1>
                    <span className="bodySmall mb-5 text-center">Our platform offers a secure, user-friendly <br /> experience with powerful features like 24/7 support, customization, mobile compatibility, <br />and seamless integrations—built to help you work smarter and faster</span>
                    
                {FeatureList.map((item,i)=>{
                    return(
                        <div key={i} className="col-6 p-2 col-md-3 col-lg-4 col-sm-6 p-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-3">
                                            <img className="w-100" src={item['img']} />
                                        </div>
                                        <div className="col-9">
                                            <h3 className="bodyXLarge">{item['name']}</h3>
                                            <span className="bodySmall">{item['description']}</span>
                                        </div>
                                    </div>
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

export default Features;