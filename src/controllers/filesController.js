export const getContent = (req, res) => {

}

export const mkdir = (req, res) => {
    
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