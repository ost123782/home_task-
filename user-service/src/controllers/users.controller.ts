import bcrypt from "bcrypt";
import { ISafeUser } from "../common/interfaces/user.interface";
import { createUserInDb, deleteUserInDb, findUser, findUsers, updateUserInDb } from "../repositories/user.repository";

export async function createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = createUserInDb(name, email, hashedPassword);

    return user;
}

export async function getUsers() {
    return await findUsers();
}

export async function getUser(id: string) {
    return await findUser(id);
}

export async function updateUser(id: string, userData: Partial<ISafeUser>) {
    const updatedUser = await updateUserInDb(id, userData);

    return updatedUser;
}

export function deleteUser(id: string) {
    return deleteUserInDb(id);
}
