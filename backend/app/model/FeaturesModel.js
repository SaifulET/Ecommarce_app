import mongoose from "mongoose";

const DataSchema= new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    img:{type:String,required:true},
    description:{type:String,required:true},

},{
    timestamps:true,
    versionKey:false
}

)

const FeaturesModel=mongoose.model('features',DataSchema)
export default FeaturesModel;