import { processPath } from "../lib/processPath.js";
import { opendir } from 'fs/promises';
import { mkdir } from "fs";

export const getContent = async (req, res) => {

    let { relativePath, absolutePath } = !req.params.path? processPath(req.user.id + '') : processPath( req.user.id + '-' + req.params.path);

    let content = {
        files: [],
        directories: []
    }

    const dir = await opendir(absolutePath);
    for await (const dirent of dir) {
        if (dirent.isDirectory()) content.directories.push(dirent.name)
        else if (dirent.isFile()) content.files.push(dirent.name)
    }

    res.status(200).json({
        relativePath,
        content
    });
}

export const createDir = (req, res) => {

    let { relativePath, absolutePath } = processPath(req.user.id + '-' + req.params.path);

    // let { relativePath, absolutePath } = !req.params.path? processPath(req.user.id + '') : processPath( req.user.id + '-' + req.params.path);

    mkdir(absolutePath, (err) => {
        if (err) res.status(400).json(err);
        else return res.status(200).json({msg: 'folder created!', relativePath, absolutePath});
    });
}

export const uploadContent = (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    let files = req.files.file;
    if (!Array.isArray(files)) {
        files = [files];
    }

}

export const downloadContent = (req, res) => {
    
}