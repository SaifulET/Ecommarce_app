import mongoose from "mongoose";

const DataSchema= new mongoose.Schema({
   productID:{type:mongoose.Schema.Types.ObjectId,require:true},
   userID:{type:mongoose.Schema.Types.ObjectId,require:true}

},{
    timestamps:true,
    versionKey:false
}

)

const WishModel=mongoose.model('wishes',DataSchema)
export default WishModel;