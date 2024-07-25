import mongoose from 'mongoose';

const FlpProductSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  rating:Number,
  discount:Number,
  availability:String,
  company: String,
  category: String
});

const FlpProduct = mongoose.model('flps', FlpProductSchema);

export default FlpProduct;
