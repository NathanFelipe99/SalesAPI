import 'reflect-metadata';

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.listen(3000, () => {
    console.log(`Server started on port ${PORT}`);
}); 
