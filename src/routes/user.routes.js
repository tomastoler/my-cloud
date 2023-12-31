import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import fileUpload from "express-fileupload";

// controllers
import {
    getContent,
    createDir,
    downloadContent,
    uploadContent,
} from "../controllers/filesController.js";

const userFilesRouter = Router();

userFilesRouter.use(fileUpload());

userFilesRouter.get("/content/:path?", isAuth, getContent);
userFilesRouter.get('/download/:path?', isAuth, downloadContent);
userFilesRouter.post('/mkdir/:path?', isAuth, createDir);
userFilesRouter.post('/upload/:path?', isAuth, uploadContent);

export default userFilesRouter;
