import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";

const userFilesRouter = Router();

userFilesRouter.get('/content/:path?', isAuth, (req, res) => {
    res.json(req.user);
});

export default userFilesRouter;