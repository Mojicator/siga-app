import mongoose, { Schema, Document } from "mongoose";

export interface IPriceHistory extends Document {
    pricePerKilo: number;
    pricePerVol: number;
    date: Date;
    product: Schema.Types.ObjectId;
}

const PriceHistorySchema: Schema = new Schema({
    pricePerKilo: { type: Number, required: true },
    pricePerVol: { type: Number, required: true },
    date: { type: Date },
    product: { type: Schema.Types.ObjectId }
});

export default mongoose.model<IPriceHistory>("PriceHistory", PriceHistorySchema);