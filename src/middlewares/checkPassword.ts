import {Request, Response, NextFunction} from 'express';

const checkPassword = (req: Request, res: Response, next: NextFunction) => {
    const password = req.body.password;

    if(password && password.length >= 6) {
        next();
    } else {
        res.status(400).json({ message: 'Password must be at least 6 characters long.'});
    }
}

export default checkPassword;