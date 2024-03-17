import express from 'express'
import Employees from '../models/Employees.js';

const employeesRouter = express.Router();

employeesRouter.get('/', async (req, res, next) => {
    try {
        const employeesList = await Employees.find({}).populate('department');
        if (employeesList.length === 0) {
            return res.status(404).send("No employees found.");
        }
        res.send(employeesList);
    } catch (error) {
        next(error);
    }
})

employeesRouter.get('/:dept', async (req, res, next) => {
    try {
        const employeesList = await Employees.find({ department: req.params.dept }).populate('department').exec();
        const list = [];
        employeesList.map(p => {
            const emp = {
                "_id": p._id,
                "name": p.name,
                "startDate": p.dob,
                "gender": p.gender,
                "position": p.position
            }
            list.push(emp);
        })
        res.send(list);
    } catch (error) {
        next(error);
    }
})

export default employeesRouter;