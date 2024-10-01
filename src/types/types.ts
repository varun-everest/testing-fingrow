export type TIncome = {
    name: string,
    amount: number
}

export type TTransaction = {
    transactionType : string,
    amount: number,
    date : Date,
}

export type TUser = {
    username: string,
    password: string,
    transactions: TTransaction[]
    salary: number,
    otherIncome: number
}