import mongoose from "mongoose";

const DataSchema= new mongoose.Schema({
    productID:{type:mongoose.Schema.Types.ObjectId,require:true},
    userID:{type:mongoose.Schema.Types.ObjectId,require:true},
    invoiceID:{type:mongoose.Schema.Types.ObjectId,require:true},
    qty:{type:String,required:true}
 
},{
    timestamps:true,
    versionKey:false
}

)
const  InvoiceProductModel=mongoose.model('invoiceproducts',DataSchema)
export default InvoiceProductModel