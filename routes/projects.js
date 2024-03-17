import express from 'express';
import createHttpError from 'http-errors';
import Projects from '../models/Projects.js'; // Correct import path

const projectsRouter = express.Router();

// GET: /projects -> Get all projects
projectsRouter.get('/', async (req, res, next) => {
    try {
        const projectsList = await Projects.find({}).populate('department').exec();
        const list = [];
        projectsList.map(p => {
            const project = {
                "_id": p._id,
                "name": p.name,
                "description": p.description,
                "startDate": p.startDate.getDay() + "/" + p.startDate.getMonth() + "/" + p.startDate.getFullYear(),
                "type": p.type,
                "departmentId": p.department._id,
                "departmentName": p.department.name
            }
            list.push(project);
        })
        res.send(list);
    } catch (error) {
        next(error);
    }
});

// PUT: /projects/:id
projectsRouter.put("/:id", async (req, res, next) => {
    /* try {
        const { type, price, topping } = req.body;
        const existingCake = await projects.findOne({ _id: req.params.id });
        if (existingCake == null) {
            throw createHttpError.BadRequest("Can't find this cake!")
        } else {
            const updatedCake = await projects.updateOne({ _id: req.params.id }, { type, price, topping });
            res.send(updatedCake);
        }
    } catch (error) {
        next(error)
    } */
    const { name, description, startDate, type, department } = req.body;
    try {
        const findingProjects = await Projects.findByIdAndUpdate({ _id: req.params.id }).populate('department').exec();
        if (findingProjects) {
            const updatedProject = await Projects.updateOne({ _id: req.params.id },
                { name, description, startDate, type, department });
            const result = await Projects.findById({ _id: req.params.id }).populate('department').exec();
            res.send(result);
        } else {
            throw createHttpError.NotFound("Cake does not exist!");
        }
    } catch (error) {
        next(error)
    }
});

export default projectsRouter;