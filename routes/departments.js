import express from 'express';
import createHttpError from 'http-errors';
import Departments from '../models/Departments.js'; // Correct import path

const departmentsRouter = express.Router();

departmentsRouter.get('/', async (req, res, next) => {
    try {
        const departmentsList = await Departments.find({}).exec();
        res.send(departmentsList);
    } catch (error) {
        next(error);
    }
});

export default departmentsRouter;