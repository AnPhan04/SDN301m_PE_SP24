import mongoose, { Schema } from "mongoose";

const departmentsSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Departments = mongoose.model("departments", departmentsSchema);

export default Departments;
