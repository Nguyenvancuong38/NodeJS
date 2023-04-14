import {Request, Response, NextFunction} from 'express';

const checkPassword = (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/])(?=.*[a-zA-Z]).{6,}$/;
    const emailRegex = /\S+@\S+\.\S+/;

    if (!password.match(passwordRegex)) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character' });
    }

    if (!email.match(emailRegex)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    next();
}

export default checkPassword;