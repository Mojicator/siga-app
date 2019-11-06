import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
    name: string;
    giro: string;
    key: string;
}

const CompanySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    giro: { type: String, required: true },
    key: { type: String, required: true }
});

export default mongoose.model<ICompany>("Company", CompanySchema);