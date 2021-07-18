import { sequelize as seqPool } from '../helpers/db';
import {
    Model,
    DataTypes,
    Optional
} from 'sequelize';

export interface IUser {
    id?: number | null;
    email: string;
    name: string;
    gender?: string | null;
    birthdate?: Date | null;
};

interface IUserCreation extends Optional<IUser, 'id' | 'gender' | 'birthdate'> {}

export default class User extends Model<IUser, IUserCreation> implements IUser {
    public id!: number;
    public email!: string;
    public name!: string;
    public gender!: string;
    public birthdate!: Date;
};

User.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'users',
        sequelize: seqPool,
        timestamps: false
    }
);