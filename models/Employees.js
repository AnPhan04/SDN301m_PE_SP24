import mongoose, { Schema } from "mongoose";

const employeesSchema = new Schema({
    "name": {
        type: String,
        required: true,
        unique: true
    },
    "dob": {
        type: Date
    },
    "gender": { type: String },
    "position": { type: String },
    "department": {
        type: Schema.Types.ObjectId,
        ref: "departments"
    }
}, {
    timestamps: true
});

const Employees = mongoose.model("employees", employeesSchema);

export default Employees;
