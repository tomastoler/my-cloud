import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const isAuth = async (req, res, next) => {
    if (!req.headers['authorization'] || !req.headers['authorization'].split(' ')[0] == 'bearer') {
        res.status(400).json({ msg: '[ERROR] authorization header error' });
    }
    const token = req.headers['authorization'].split(' ')[1];
    console.log('[TOKEN]', token);
    if (!token) { return res.status(400).json({msg: '[ERROR] falta el token'}); }
    const jwtdata = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('[JWTDATA]', jwtdata);
    if (jwtdata) {
        const user = await User.findOne({id: jwtdata.id, attributes: {
            exclude: 'password'
        }});
        if (user) {
            req.user = user;
            return next();
        } else {
            return res.status(400).json({msg: 'JWT Token error 3'});
        }
    }
    return res.status(400).json({msg: '[ERROR] como llegaste hasta acá???'});
}   