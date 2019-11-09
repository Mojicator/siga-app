import mongoose, { Schema, Document } from "mongoose";

export interface IWarehouse extends Document {
    name: string;
    company?: Schema.Types.ObjectId;
}

const WarehouseSchema: Schema = new Schema({
    name: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: "Company" }
});

export default mongoose.model<IWarehouse>("Warehouse", WarehouseSchema);