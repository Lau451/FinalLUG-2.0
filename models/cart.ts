import { Schema, model} from "mongoose";

const cartSchema = new Schema({
  name: { type: String, required: true, unique: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
});

export default model("Cart", cartSchema);
