import { Schema, model, models } from "mongoose";
const testSchema = new Schema({
  address: String,
  lng: Number,
  lat: Number,
});
const Location = models.Location || model("Location", testSchema);
export default Location;
