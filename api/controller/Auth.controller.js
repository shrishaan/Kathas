import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'; 
import jwt from 'jsonwebtoken';

export const Register = async (req, res, next) => { 
    try{
        const {name, email, password} = req.body;
        const checkuser = await User.findOne({email }); 
        if(checkuser){
            next(handleError(409, 'User already registered.'));
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        //Register User
        const user = new User({
            name, email, password: hashedPassword
        })

        await user.save();
        
        res.status(200).json({
            success: true,
            message: 'User registered successfully'
        })

    }
    catch(error){
        next(handleError(500, error.message));
    }
}

export const Login = async (req, res, next) => { 
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            
        }
        const hashedPassword = user.password;
        const comparePassword = bcryptjs.compare(password, hashedPassword);
        if(!comparePassword){
            next(handleError(404, 'Invalid Login Credentials.'));
        }

        const token = jwt.sign
    } catch (error) {
         next(handleError(500, error.message));
    }
};
