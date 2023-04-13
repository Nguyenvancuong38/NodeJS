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
    } catch (error) {
        
    }
}