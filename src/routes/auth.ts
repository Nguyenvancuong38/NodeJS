import express from 'express';
import { register, login } from '../controllers/authController';
import { changePassword, deleteAllUser } from '../controllers/User';
import checkPassword from '../middlewares/checkPassword';

const router = express.Router();

// Register
router.post('/register', checkPassword, register);

// Login
router.post('/login', login);

//Update A User
router.put('/update', changePassword);

//Delete All User
router.delete('/deleteAllUser', deleteAllUser);

export default router;
