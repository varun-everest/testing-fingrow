import TransactionModel from "../collections/transactions.collection"
import UserModel from "../collections/user.collection"

class Report {
    reportType: string
    startDate: Date
    endDate: Date 

    constructor(reportType: string, startDate: string, endDate: string) {
        this.reportType = reportType
        this.startDate = new Date(startDate)
        this.endDate = new Date(endDate)
    }

    generateReport = async(username: string) => {
        const user = await UserModel.findOne({username: username});
        if(!user) {
            return 'User not found';
        }

        const userTransactions = await TransactionModel.findOne({userId: user._id});
        if(!userTransactions) {
            return 'No Transactions Found';
        }
        const filteredTxns = userTransactions.transactions.filter((txn) => txn.date! >= this.startDate && txn.date! <= this.endDate);

        if(this.reportType === 'Total Summary') {
            
            
            let totalIncome = 0;
            let totalExpenses = 0;
            let summary: { [key: string]: number } = {};

            filteredTxns.forEach((txn) => {
                if(txn.txnCategory === 'budget') {
                    totalExpenses += txn.amount!
                } else {
                    totalIncome += txn.amount!
                }

                if (txn.name) {
                    if (!summary[txn.name]) {
                        summary[txn.name] = 0; 
                    }
                    summary[txn.name] += txn.amount!; 
                }
            });

            return {reportType: this.reportType, totalExpenses, totalIncome, summary};
        }
        else if(this.reportType === 'Budget Summary') {
        
            let summary: { [key: string]: number } = {};

            filteredTxns.forEach((txn) => {
                if(txn.txnCategory === 'budget') {
                    if (txn.name) {
                        if (!summary[txn.name]) {
                            summary[txn.name] = 0; 
                        }
                        summary[txn.name] += txn.amount!; 
                    }
                }
            });

            return {reportType: this.reportType, summary};
        }
        else if(this.reportType === 'Saving Goals Summary') {
        
            let summary: { [key: string]: number } = {};

            filteredTxns.forEach((txn) => {
                if(txn.txnCategory === 'savinggoal') {
                    if (txn.name) {
                        if (!summary[txn.name]) {
                            summary[txn.name] = 0; 
                        }
                        summary[txn.name] += txn.amount!; 
                    }
                }
            });

            return {reportType: this.reportType, summary};
        }
    }
}
export default Report;