import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Transaction } from 'sequelize';

import { sequelize } from '../helpers/db';

import Auth, { IAuth } from '../models/auth.model';
import User from '../models/user.model';
import { validateAuthInputs, validateUserInputs } from '../services/validator';


/**
 * This is the Register Controller
 * @param req 
 * @param res 
 * @returns 
 */
export const register = async (req: Request, res: Response) => {

    const { email, password, name, gender, birthdate } = req.body;

    try {
        validateAuthInputs(email, password);
        validateUserInputs(name, gender, birthdate);
    } catch (err) {
        return res.status(400).json(`Error: ${err.message}`);
    }

    const auth = new Auth({
        email,
        password
    });

    const [yyyy, mm, dd] = birthdate.split('/');
    const user = new User({
        email,
        name,
        gender,
        birthdate: new Date(Date.UTC(yyyy, mm, dd))
    });

    sequelize.transaction(async (transaction: Transaction) => {
        const responseAuth: IAuth = await auth.save({ transaction });
        await user.save({ transaction });
        return responseAuth;
    })
        .then((responseAuth) => {
            return res.status(201).json(`User registered with email: ${responseAuth.email}!`);
        })
        .catch((err) => {
            if (err.message === 'Validation error')
                res.status(400).json('Error: The user with that email already exists!');
            else
                res.status(400).json(`Error: ${err}!`);
            throw new Error();
        })
}


/**
 * This is the Login method
 * @param req 
 * @param res 
 * @returns 
 */
export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        validateAuthInputs(email, password);
    } catch (err) {
        return res.status(400).json(`Error: ${err.message}`);
    }

    const auth = await Auth.findOne({ where: { email: email } });

    if (auth === null) {
        return res.status(401).json('Error: The user wasn\'t registered yet!');
    } else {
        const correctPassword = await auth.validatePassword(password);
        if (!correctPassword) return res.status(401).json('Error: Invalid Password!');

        const token: string = jwt.sign({ email: auth.email }, process.env.JWT_SECRET || 'default_token', {
            expiresIn: '20m'
        });

        res.cookie('musvibeToken', token);
        res.status(200).json('Signed In!');
    }

}



/**
 * This is the logout method
 * @param req 
 * @param res 
 * @returns 
 */
export const logout = async (req: Request, res: Response) => {

    res.status(200).clearCookie('musvibeToken').json('Signed out!');

}