import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import './../../shared/container';

import { routes } from './../../shared/routes';
import responseFilter from '../middlewares/response.filter';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes, responseFilter);

const PORT = 3000;
app.listen(3000, () => {
    console.log(`Server started on port ${PORT}`);
}); 
