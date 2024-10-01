import { TUser } from "../types/types";

export const users : TUser[] = [
    {
        username:'Varun',
        password:'V@run765',
        salary: 25000,
        otherIncome: 50000,
        transactions: []
    }, 
    {
        username:'Virat',
        password:'Virat@18',
        salary: 30000,
        otherIncome: 10000,
        transactions: []
    }
]

export const currentUser = users[0];