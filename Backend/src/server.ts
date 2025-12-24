import express from 'express';
import cors from 'cors';
import { db } from './config/database';

const app = express();
const port = 4000;

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })

    );

    db.connect().then(() => {
        console.log('Database connected successfully');
    }).catch((error) => {
        console.error('Database connection error:', error);
        process.exit(1);
    });

    app.get('/', (req, res) => {
        res.status(200).send('server is healthy');
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

