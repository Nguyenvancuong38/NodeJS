import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const changePassword = async (req: Request, res: Response) => {
    try {
        const { newPassword} = req.body;

        const user = await prisma.user.update({
            where: { id: 1},
            data: {password: newPassword}
        });

        res.status(200).json({massage: "change password successful!"})
    } catch (error) {
        res.status(500).json({massage: "change password don't successful!"})
    }
}

export const deleteAllUser = async (req: Request, res: Response) => {
    try {
        const result = await prisma.user.deleteMany();
        res.status(200).json({massage: "Delete Successful!"})
    } catch (error) {
        res.status(400).json({massage: "Delete Not Successful!"})
    }
    
}
