import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const userOld = await prisma.user.findUnique({ where: { email } });
    if(userOld) {
      res.status(400).json({ message: "Email already!" });
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user to database
      const user = await prisma.user.create({
        data: {
          role,
          email,
          password: hashedPassword,
        },
      });
      res.status(201).json({ user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ token, user });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
