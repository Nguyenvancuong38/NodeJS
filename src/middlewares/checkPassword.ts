import {Request, Response, NextFunction} from 'express';

const checkPassword = (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/])(?=.*[a-zA-Z]).{6,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.match(emailRegex)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!password.match(passwordRegex)) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character' });
    }

    next();
}

export default checkPassword;