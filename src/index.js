import express from "express";
import morgan from "morgan";
import cors from 'cors';
import 'dotenv/config';

// database 
import { sequelize } from './db.js';
import './models/user.js';

// routers
import userAuthRouter from './routes/auth.routes.js';
import userFilesRouter from "./routes/user.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors({
    origin: '*'
}));

// routes
app.use('/api', userAuthRouter);
app.use('/api/user', userFilesRouter)

// docker run -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=my-cloud-db -p 3306:3306 mysql
sequelize.sync({force: true})
    .then(() => {
        console.log('[MYSQL] DB is connected');
        app.listen(PORT, () => {
            console.log('[LISTENING] Server on port', PORT);
        });
    })
    .catch(error => {
        console.log(error);
    });
