import { Router } from "express";

import { Authenticator } from "../services/tokens";

import { register, login, logout } from "../controllers/auth.controller";

const router: Router = Router();

//  Routes definition
router.post('/register', register);
router.post('/login', login);

router.post('/logout', Authenticator, logout);

export default router;