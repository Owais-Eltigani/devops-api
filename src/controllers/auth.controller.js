// import { log } from "winston"
import { signupSchema, signInSchema } from "../validations/auth.validation.js";
import { createUser, loginUser } from "../services/auth.service.js";
import { jwttoken } from "../utils/jwt.js";
import { cookies } from "../utils/cookie.js";
import logger from "../config/logger.js";

export const signup = async (req, res, next) => {

    try {
        const validatedData = signupSchema.parse(req.body);    

        const { name, email, password, role } = validatedData;
        logger.info('User signup data validated:', { name, email });

        const user = await createUser({ name, email, password, role });
        const token = jwttoken.sign({ id: user.id, email: user.email, role: user.role });
        
        logger.info('setting cookies:', user.id);
        cookies.set(res, 'auth_token', token); 

        return res.status(201).json({ message: 'User signed up successfully', user: { name: user.name, email: user.email } });
    } catch (error) {
        logger.error('Error in signup controller:', error);
        next(error);
    }
}

export const signin = async (req, res, next) => {
    try {
        const validatedData = signInSchema.parse(req.body);
        const { email, password } = validatedData;
        
        logger.info('User signin attempt:', { email });

        const user = await loginUser({ email, password });
        const token = jwttoken.sign({ id: user.id, email: user.email, role: user.role });

        logger.info('setting cookies:', user.id);
        cookies.set(res, 'auth_token', token);

        return res.status(200).json({ message: 'User signed in successfully', user });
    } catch (error) {
        logger.error('Error in signin controller:', error);
        next(error);
    }
}

export const signout = async (req, res, next) => {
    try {
        cookies.clear(res, 'auth_token');
        logger.info('User signed out successfully');
        return res.status(200).json({ message: 'User signed out successfully' });
    } catch (error) {
        logger.error('Error in signout controller:', error);
        next(error);
    }
}
