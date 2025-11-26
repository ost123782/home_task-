import bcrypt from "bcrypt";
import { ISafeUser } from "../common/interfaces/user.interface";
import { createUserInDb, deleteUserInDb, findUser, findUsers, updateUserInDb, updateUserPasswordInDb } from "../repositories/user.repository";
import { generateAccessToken } from "../strategies/auth.strategy";
import { publishUserCreated } from "../rabbitmq";

export async function createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUserInDb(name, email, hashedPassword);

    const token = generateAccessToken(user.email, user._id.toString());

    publishUserCreated({userId: user._id.toString()});

    return token;
}

export async function getUsers() {
    return await findUsers();
}

export async function getUser(id: string) {
    return await findUser(id);
}

export async function updateUserPassword(id: string, userPassword: string) {
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const updatedUser = await updateUserPasswordInDb(id, hashedPassword);

    return updatedUser;
}

export async function updateUser(id: string, userData: Partial<ISafeUser>) {
    const updatedUser = await updateUserInDb(id, userData);

    return updatedUser;
}

export function deleteUser(id: string) {
    return deleteUserInDb(id);
}
