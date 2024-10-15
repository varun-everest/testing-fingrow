class Budget{
    category : string
    allotedAmount: number
    spentAmount: number

    constructor(category: string, allotedAmount: number){
        this.category = category
        this.allotedAmount = allotedAmount
        this.spentAmount = 0
    }

    updateBudget = async(newAllotedAmount: number) => {
        if(newAllotedAmount >= this.spentAmount) {
            this.allotedAmount = newAllotedAmount;
        }
        return ;
    }

    checkBudget = async() => {
        return `You have spent ${this.spentAmount} amount from the ${this.allotedAmount} Amount you alloted for ${this.category}`;
    }

}

export default Budget;