import mongoose from "mongoose";

const DataSchema= new mongoose.Schema({
    productID:{type:mongoose.Schema.Types.ObjectId,require:true ,ref:'product'},
    userID:{type:mongoose.Schema.Types.ObjectId,require:true ,ref:'user'},
    des:{type:String,required:true},
    rating:{type:String,required:true},

 
},{
    timestamps:true,
    versionKey:false
}

)
DataSchema.index({ productID: 1, userID: 1 }, { unique: true });
const  ReviewModel=mongoose.model('reviews',DataSchema)
export default ReviewModel;