import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const isAuth = async (req, res, next) => {
    // check if authorization header is ok
    if (!req.headers['authorization'] || !req.headers['authorization'].split(' ')[0] == 'bearer') {
        res.status(400).json({ msg: '[ERROR] authorization header error' });
    }

    // get token
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) { return res.status(400).json({msg: '[ERROR] falta el token'}); }
    
    // get token data
    const jwtdata = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (jwtdata) {
        const user = await User.findOne({id: jwtdata.id, attributes: {
            exclude: 'password'
        }});
        if (user) {
            req.user = user;
            return next();
        } else {
            return res.status(400).json({msg: '[ERROR] el token no es válido'});
        }
    }
    return res.status(400).json({msg: '[ERROR] como llegaste hasta acá???'});
}