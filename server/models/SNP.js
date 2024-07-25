import mongoose from 'mongoose';

const SnpProductSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  rating:Number,
  discount:Number,
  availability:String,
  company: String,
  category: String
});

const SnpProduct = mongoose.model('snps', SnpProductSchema);

export default SnpProduct;
