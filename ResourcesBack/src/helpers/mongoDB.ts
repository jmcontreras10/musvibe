import mongoose from 'mongoose';

import { database_config } from '../config/database-config';

const dbUrl = `mongodb://${database_config.MONGO_USER}:${database_config.MONGO_PASSWORD}@127.0.0.1:27017/${database_config.MONGO_DATABASE}`;

mongoose.connect(dbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })    
    .then(() =>{
        console.log("Mongoose connected")
    })
    .catch(err =>{
        console.log(err);
    })