import { useContext, useEffect } from "react"
import { DataContext } from "../../Context/Context"
import TransactionTile from "./TransactionTile";
import './TransactionTile.css'

const RecentTransactions = () => {

    const {recentTxns} = useContext(DataContext);

    useEffect(() => {
    }, [recentTxns]);

  return (
    <div className="txns-container">
        {
            recentTxns.length === 0 ? <h1>No Transactions!!</h1> : (
                recentTxns.map((txn, index) => (
                    <TransactionTile
                        key={index}
                        txnCategory={txn.txnCategory}
                        amount={txn.amount}
                        description={txn.description}
                        name={txn.name}
                        date={new Date(txn.date).toLocaleDateString()}
                    />
                ))
            )
        }
    </div>
  )
}

export default RecentTransactions;