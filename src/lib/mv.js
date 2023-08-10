import * as path from 'path';
import { access } from 'fs/promises';

export const moveFile = (file, storagePath) => {
    const filePath = path.join(storagePath, file.name);

    return new Promise((resolve, reject) => {
        access(filePath)
            .then(() => reject(new Error('File already exists')))
            .catch(() => {
                file.mv(filePath, (err) => {
                    err ? reject(err) : resolve();
                });
            });
    });
}