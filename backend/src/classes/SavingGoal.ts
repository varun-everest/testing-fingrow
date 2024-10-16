class SavingGoal {
    title: string;
    targetAmount: number;
    currentAmount: number;

    constructor(title: string, targetAmount: number) {
        this.title = title;
        this.targetAmount = targetAmount;
        this.currentAmount = 0;
    }
}

export default SavingGoal;