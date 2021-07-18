import { Sequelize } from 'sequelize';

const databaseData = {
    name: process.env.DATABASE_NAME || 'usersdb',
    user: process.env.DATABASE_USER || 'admin',
    pass: process.env.DATABASE_PASS || 'test2403'
};

export const sequelize = new Sequelize(databaseData.name, databaseData.user, databaseData.pass, {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export const connect = async (): Promise<string> =>{
  try {
    await sequelize.authenticate(); 
    await sequelize.sync();
    return 'Connection has been established successfully.';
  } catch (error) {
    throw new Error(error);
  }
}

export const close = async (): Promise<void> => {
  await sequelize.close();
}