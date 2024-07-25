import mongoose from 'mongoose';

const MynProductSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  rating:Number,
  discount:Number,
  availability:String,
  company: String,
  category: String
});

const MynProduct = mongoose.model('myns', MynProductSchema);

export default MynProduct;
