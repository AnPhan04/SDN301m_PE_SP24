import mongoose, { Schema } from "mongoose";

const projectsSchema = new Schema({

    "name": String,
    "description": {
        type: String,
        require: true
    },
    "startDate": {
        type: Date,
        require: true
    },
    "type": {
        type: String,
    },
    "department": {
        type: Schema.Types.ObjectId,
        ref: "departments"
    }

}, {
    timestamps: true
})

const Projects = mongoose.model("projects", projectsSchema);

export default Projects;