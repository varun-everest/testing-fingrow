export type TIncome = {
    name: string,
    amount: number
}

export type TTransaction = {
    transactionType : string,
    amount: number,
    date : Date,
    description: string
}

export type TUser = {
    username: string,
    password: string,
    transactions: TTransaction[],
    salary: number,
    otherIncome: number,
    expenses: TBudget[]
}

export type TBudget = {
    category: string,
    allotedAmount: number,
    usedAmount: number,
}