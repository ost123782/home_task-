import { ISafeUser } from "../common/interfaces/user.interface";
import userModel from "../models/user.model";

export function findUsers() {
    return userModel.find({});
}

export function findUser(id: string) {
    return userModel.findById(id);
}

export function findUserByEmail(email: string) {
    return userModel.findOne({ email })
}

export function updateUserInDb(userId: string, userData: Partial<ISafeUser>) {
    return userModel.updateOne(
        { _id: userId },
        { $set: userData }
    );
}

export function updateUserPasswordInDb(userId: string, newPassword: string) {
    return userModel.updateOne(
        { _id: userId },
            { $set: {
                password: newPassword
            }        
        }
    );
}

export function deleteUserInDb(userId: string) {
    return userModel.deleteOne({
        _id: userId
    })  
}


export function createUserInDb(name: string, email: string, password: string) {
    return userModel.create({
        name,
        email,
        password
    });
}

