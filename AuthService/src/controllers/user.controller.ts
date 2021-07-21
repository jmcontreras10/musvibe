import { Request, Response } from 'express';

import { clean } from '../helpers/misc';

/**
 * This is the logout method
 * @param req 
 * @param res 
 * @returns 
 */
 export const me = async (req: Request, res: Response) => {
     
    res.status(200).json(clean(req.user));

}