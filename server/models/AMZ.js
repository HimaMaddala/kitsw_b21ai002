import mongoose from 'mongoose';

const amzProductSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  rating:Number,
  discount:Number,
  availability:String,
  company: String,
  category: String
});

const AmzProduct = mongoose.model('amzs', amzProductSchema);

export default AmzProduct;
