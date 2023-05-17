import { Schema, model, models } from "mongoose";
const testSchema = new Schema({
  productName: String,
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
const Product = models.Test || model("Product", testSchema);
export default Product;