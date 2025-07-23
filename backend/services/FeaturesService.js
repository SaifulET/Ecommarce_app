import FeaturesModel from "../app/model/FeaturesModel.js";
import Legal from "../app/model/LegalModel.js";



export const FeaturesListService=async(req,res)=>{
  try{
    const results = await FeaturesModel.find();
    return {status:"success",data:results};

  }
  catch(e){
    return {status:"fail", error: e.tostring() };

  }
}

export const CreateLegalService = async (req, res) => {
    const { type, description } = req.body;
  
    if (!type || !description) {
      return {status:"fail", error: 'Type and description are required' };
    }
  
    try {
      const newLegal = new Legal({ type, description });
      const saved = await newLegal.save();
      return {status:"success",data:saved};
    } catch (err) {
        return {status:"fail", error: 'Error creating legal entry' };
    }
  };
  export const LegalDetailsService = async (req, res) => {
    try {
      const results = await Legal.find({ type: req.params.type });
      if (results.length === 0) {
         return {status:"fail", message: 'No entries found for this type' };
      }
      return {status:"success",data:results};
    } catch (err) {
        return {status:"fail", error: 'Error fetching legal entries' };
    }
  };