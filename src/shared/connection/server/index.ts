import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import '../../container';
import { routes } from '../../routes';
import responseFilter from '../../middlewares/response.filter';
import { dataSource } from '../typeorm';


await dataSource.initialize().then(() => {
    console.log('DataSource initialized');
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/v1', routes, responseFilter);

const PORT = 3000;
app.listen(3000, () => {
    console.log(`Server started on port ${PORT}`);
}); 
