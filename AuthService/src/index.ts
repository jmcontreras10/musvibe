import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connect } from './helpers/db';

const start = () => {
    connect().
        then((message) => {
            console.log(message)
            app.listen(app.get('port'));
        })
        .catch((err) => {
            //  TODO
            console.log(err)
        })
}

start();