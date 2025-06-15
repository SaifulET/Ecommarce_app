import mongoose from "mongoose";

const DataSchema= new mongoose.Schema({
   store_id: {type:String},
  store_passwd: {type:String},
  currency:{type:String},
  success_url:{type:String},
  fail_url: {type:String},
  cancel_url:{type:String},
  ipn_url: {type:String},
  init_url: {type:String}
 
},{
    timestamps:true,
    versionKey:false
}

)

const paymentSettingsModel = mongoose.model('paymentSettings', DataSchema, 'paymentSettings');

export default paymentSettingsModel