import * as path from 'path';
import { mkdir } from 'fs';

/**
 * 
 * @param { String } userID user id
 */
export const createUserFolder = (userID) => {
    userID += ''
    const userFolder = path.join(process.env.URL_FILE_STORAGE, userID);
    mkdir(userFolder, err => {
        if (err) throw new Error('user folder already created');
        else return 'done';
    });
}