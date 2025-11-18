import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'; 

export const Register = async (req, res, next) => { 
    try{
        const {name, email, password} = req.body;
        const checkuser = await User.findOne({email }); 
        if(checkuser){
            next(handleError(409, 'User already registered.'));
        }

        const hashedPassword = bcryptjs.hashSycn(password);
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

export const Login = async (req, res) => { }
