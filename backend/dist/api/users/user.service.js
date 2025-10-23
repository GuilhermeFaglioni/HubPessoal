import prisma from "../../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const saltRounds = 10;
export const createUser = async (userData) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: userData.email
        }
    });
    if (existingUser) {
        throw new Error('Este email já está em uso');
    }
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    const newUser = await prisma.user.create({
        data: {
            full_name: userData.full_name,
            email: userData.email,
            password_hash: hashedPassword
        },
    });
    const { password_hash, ...newUserReturn } = newUser;
    return newUserReturn;
};
export const authUser = async (userData) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: userData.email
        }
    });
    if (!existingUser) {
        throw new Error('Credenciais invalidas');
    }
    if (await bcrypt.compare(userData.password, existingUser.password_hash)) {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('Token não encontrado');
        }
        const token = jwt.sign({ userId: existingUser.id }, jwtSecret, { expiresIn: '1d' });
        const returnUser = {
            id: existingUser.id,
            full_name: existingUser.full_name,
            email: existingUser.email,
            hasCompletedOnboarding: existingUser.has_completed_onboarding
        };
        return { token, returnUser };
    }
    else {
        throw new Error('Credenciais invalidas');
    }
};
export const getUserById = async (userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    const { password_hash, ...returnUser } = user;
    return returnUser;
};
export const concludeOnboarding = async (userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            has_completed_onboarding: true
        }
    });
    const { password_hash, ...returnUser } = updatedUser;
    return returnUser;
};
