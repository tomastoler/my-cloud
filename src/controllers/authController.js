import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { hashPassword, comparePassword } from '../lib/password.js';
import { createUserFolder } from "../lib/createUserFolder.js";

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Object}
 */
export const registerUser = (req, res) => {
    const { username, password } = req.body;
    User.findOne({username})
        .then(user => {
            // cheqking if user already exist or if the email have been taken
            if (user) {
                return res.json({
                    msg: 'Email already taken'
                });
            }

            // crating user
            User.create({
                username,
                password: hashPassword(password)
            }).then(newUser => {

                // create user route in file storage url
                try {
                    createUserFolder(newUser.id);
                } catch (err) {
                    console.log(`[${newUser.id}] ${err}`);
                }
                
                // creating user data
                const userdata = {
                    id: newUser.id,
                    username: newUser.username
                };
                // creating JWT 
                const jwttoken = jwt.sign(userdata, process.env.JWT_SECRET_KEY, {
                    expiresIn: '15d'
                });
                // sending data
                return res.json({
                    jwttoken,
                    userdata
                });
            });
        });
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Object}
 */
export const authUser = (req, res) => {
    const { username, password } = req.body;
    User.findOne({username})
        .then(user => {
            if (user && comparePassword(password, user.password)) {
                const userdata = {
                    id: user.id,
                    username: user.username
                };
                const jwttoken = jwt.sign(userdata, process.env.JWT_SECRET_KEY, {
                    expiresIn: '15d'
                });
            
                return res.json({
                    jwttoken,
                    userdata
                });
            }

            return res.json({
                msg: 'Email or password incorrect'
            });
        })
}