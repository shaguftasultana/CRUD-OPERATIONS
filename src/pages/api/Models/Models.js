import { Schema, model, models } from "mongoose";
const testSchema = new Schema({
  productname: String,
  price: String,
  expiryDate: String,
  manufacturedDate: String,
  description: String,
  image: String,
  category: String,
  checkbox: String,
  dropdown: String,
  location: String,
});
const Product = models.Product || model("Product", testSchema);
export default Product;