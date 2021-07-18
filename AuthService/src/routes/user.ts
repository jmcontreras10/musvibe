import { Router } from "express";

import { Authenticator } from "../services/tokens";

import { me } from "../controllers/user.controller";

const router: Router = Router();

//  Routes definition
router.get('/me', Authenticator,  me);

export default router;