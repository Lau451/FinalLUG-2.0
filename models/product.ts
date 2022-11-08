import { Schema, model} from "mongoose";
import { Document}  from "mongoose"

interface IProduct  extends Document{
name: String,
precio: Number,
enCart: Boolean
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true, unique: true },
  enCart: { type: Boolean, default: false },
  precio: { type: Number, required: true },
});

export default model<IProduct>("Product", productSchema);