import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
   name: string;
   quantity: number;
   warehouse?: Schema.Types.ObjectId;
   priceHistories?: Schema.Types.ObjectId[];
}

const Product: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    quantity: { type: String },
    warehouse: { type: Schema.Types.ObjectId, ref: "Warehouse" },
    priceHistories: { type: Schema.Types.ObjectId, ref: "PriceHistory" }
});

export default mongoose.model<IProduct>("Product", Product);