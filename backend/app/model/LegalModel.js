import mongoose from "mongoose";

const legalSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Legal = mongoose.model('Legal', legalSchema);
export default Legal;
