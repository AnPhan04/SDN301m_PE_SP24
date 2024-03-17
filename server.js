import express, { json } from 'express'
import * as dotenv from 'dotenv'
import connectDB from './database/database.js';
import createHttpError from 'http-errors';
import cors from 'cors';
import { DepartmentsRouter, EmployeesRouter, ProjectsRouter } from './routes/index.js';

dotenv.config();
const app = express();
app.use(json());
app.use(cors());
app.get('/', (req, res) => {
    res.send("Some welcome text goes here");
})

// TODO: app.use()
app.use('/departments', DepartmentsRouter);
app.use('/employees', EmployeesRouter);
app.use('/projects', ProjectsRouter);

// http-errors
app.use(async (req, res, next) => {
    next(createHttpError.NotFound()); // Có thể bổ sung message trong hàm NotFound
})
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            err_msg: err.message
        }
    });
});

// connect port
const port = process.env.PORT || 8080;
app.listen(port, async () => {
    connectDB();
    console.log(`Server is running on: http://localhost:${port}`);
});