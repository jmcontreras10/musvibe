import 'ts-path-mapping';
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import './helpers/mongoDB';

const start = () => {
    app.listen(app.get('port'));
}

start();