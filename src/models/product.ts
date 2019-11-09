import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
   name: string;
   quantity: number;
   warehouse?: Schema.Types.ObjectId;
}

const Product: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    quantity: { type: String },
    warehouse: { type: Schema.Types.ObjectId, ref: "Warehouse" }
});

export default mongoose.model<IProduct>("Product", Product);