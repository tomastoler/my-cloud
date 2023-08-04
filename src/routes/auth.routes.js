import { Router } from "express";
import { registerUser, authUser } from '../controllers/authController.js';

const userAuthRouter = Router();

userAuthRouter.post('/auth', authUser);
userAuthRouter.post('/register', registerUser);

export default userAuthRouter;