import { TUser } from "../types/types";

export const users : TUser[] = [
    {
        username:'Varun',
        password:'V@run765',
        salary: 25000,
        otherIncome: 50000,
        transactions: [],
        expenses: [
            {
                category: 'Groceries',
                allotedAmount: 10000,
                usedAmount: 500,
            },
            {
                category: 'Food',
                allotedAmount: 1000,
                usedAmount: 300,
            },
        ],
        savingGoals: [
            {
                title: 'Emergency Fund',
                targetAmount: 10000,
                savedAmount: 500,
            },
            {
                title: 'IPhone Savings',
                targetAmount: 10000,
                savedAmount: 9500,
            },
        ]
    }, 
    {
        username:'Virat',
        password:'Virat@18',
        salary: 30000,
        otherIncome: 10000,
        transactions: [],
        expenses: [],
        savingGoals: []
    }
]

export const currentUser = users[0];