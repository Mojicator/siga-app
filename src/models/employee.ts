import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
    firstName: string;
    lastName: string;
    birthDate: Date;
    phone: string;
    email: string;
    latitude?: number;
    longitude?: number;
    password: string;
    company?: Schema.Types.ObjectId;
}

const EmployeeSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    latitude: { type: Number },
    longitude: { type: Number },
    password: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: "Company" }
});

EmployeeSchema.methods.toJSON = function() {
    let employeeObject = this.toObject();
    delete employeeObject.password;

    return employeeObject;
}

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);