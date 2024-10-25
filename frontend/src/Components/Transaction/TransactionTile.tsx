import './TransactionTile.css'

interface TileProps {
    txnCategory: string,
    amount: number,
    description: string,
    name: string,
    date: string,
}

const TransactionTile = (props: TileProps) => {
  return (
    <div className='tile-container'>
        <p><b>{props.txnCategory}</b></p>
        <p className='title-text'>{props.name}</p>
        <p className='desc-text'>{props.description}</p>
        <p className={props.txnCategory === 'budget' ? 'budget-amount' : 'goal-amount'}>{props.amount}</p>
        <p>{props.date}</p>
    </div>
  )
}

export default TransactionTile;