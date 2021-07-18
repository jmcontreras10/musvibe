import { sequelize as seqPool } from '../helpers/db';
import {
    Model,
    DataTypes,
    Optional
} from 'sequelize';
import bcrypt from 'bcrypt';

export interface IAuth {
    id?: number | null;
    email: string;
    password: string;
};

interface IAuthCreation extends Optional<IAuth, 'id'> {
    email: string;
    password: string;
}

export default class Auth extends Model<IAuth, IAuthCreation> implements IAuth {
     id!: number;
    public email!: string;
    public password!: string;

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
};

const encrypt = async (auth: IAuth) => {
    const salt = await bcrypt.genSalt(10);
    auth.password = await bcrypt.hash(auth.password, salt);
};

Auth.init(
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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: 'auth',
        sequelize: seqPool,
        timestamps: false,
        hooks: {
            beforeCreate: encrypt,
            beforeUpdate: encrypt
        }
    }
);