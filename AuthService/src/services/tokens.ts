import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import Auth from "../models/auth.model";
import User from "../models/user.model";

interface IJWTPayload{
    email: string;
    iat: number;
    exp: number;
}

export const Authenticator = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.musvibeToken;
    if(!token) return res.status(401).json("Error: Access denied");

    try {
        const jwtPayload: IJWTPayload = jwt.verify(token,  process.env.JWT_SECRET || 'default_token') as IJWTPayload;    const auth = await Auth.findOne({ where: { email: jwtPayload.email } });
        if(!auth) return res.status(401).clearCookie('musvibeToken').json("Error: Access denied!");
        const user = await User.findOne({ where: { email: jwtPayload.email } });

        req.user = user;
    } catch (err) {
        if(err.name === 'jwt expired'){
            return res.status(401).clearCookie('musvibeToken').json("Error: Your session has expired! Please login again");
        }
        return res.status(401).json("Error: Your session has expired! Please login again");
    }
    next();
    

}