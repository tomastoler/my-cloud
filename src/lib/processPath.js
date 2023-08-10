import * as path from 'path';

const slash = process.platform === 'win32' ? '\\' : '/';

export const processPath = (urlPath) => {
    const relativePath  = urlPath ? urlPath.replace(/-/g, slash) : slash;
    const absolutePath = path.join(process.env.DISK_PATH, relativePath);
    return {
        relativePath,
        absolutePath
    };
}