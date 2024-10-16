import { TUser } from "../types/types";
import { users } from "../data/data";


export const validateCredentials = (userName: string, password: string) => {
    if(password.length < 8) {
        return `password should have altleast 8 characters`;
    }
    const findUser = users.find(user => user.username === userName);
    if(!findUser) {
        return 'User Not Found'
    }
    if(findUser && findUser.password !== password) {
        return 'Password mismatched'
    }
    return 'User Found'
}

export const addNewUser = (newUser: TUser) => {
    users.push(newUser);
}