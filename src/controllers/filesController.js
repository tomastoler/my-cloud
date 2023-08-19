import { processPath } from "../lib/processPath.js";
import { opendir } from 'fs/promises';
import { mkdir } from "fs";
import { moveFile } from "../lib/mv.js";
import { lookup } from "mime";

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
    
    // check if the user have sent some file
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    // convert the files into an array of file
    // in case the user have sent only 1 file
    let files = req.files.file;
    if (!Array.isArray(files)) {
        files = [files];
    }

    let { relativePath, absolutePath } = processPath(req.user.id + '-' + req.params.path);

    for (let file of files) {
        moveFile(file, absolutePath)
            .catch(err => res.status(400).json({ err }));
    }

    res.status(200).json({
        msg: 'files uploaded',
        relativePath,
        absolutePath
    })

}

export const downloadContent = (req, res) => {
    
    let { relativePath, absolutePath } = processPath(req.user.id + '-' + req.params.path);

    const mimetype = lookup(absolutePath);

    res.setHeader('Content-Disposition', `attachment; filename=${path}`);
    res.setHeader('Content-Type', mimetype);
    res.download(path);
}