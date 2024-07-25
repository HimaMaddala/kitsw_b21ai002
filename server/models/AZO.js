import mongoose from 'mongoose';

const AzoProductSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  rating:Number,
  discount:Number,
  availability:String,
  company: String,
  category: String
});

const AzoProduct = mongoose.model('azos', AzoProductSchema);

export default AzoProduct;
