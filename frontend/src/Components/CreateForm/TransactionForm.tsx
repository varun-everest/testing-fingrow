import { useState } from 'react';
import './Form.css';

interface TransactionFormProps {
    handleSubmit: (txnCategory: string, name: string, amount:number, date: string, description: string ) => Promise<void>,
}

const TransactionForm = (props: TransactionFormProps) => {

    const [txnCategory, setTxncategory] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('')

    const handleSubmit = async(e: { preventDefault: () => void; } ) => {
        e.preventDefault();
        await props.handleSubmit(txnCategory, name, Number(amount), date, description);
        setTxncategory('');
        setName('');
        setAmount('');
        setDate('');
        setDescription('');
    }   

  return (
    <form className="form-container" onSubmit={handleSubmit}>
        <input type="text" value={txnCategory} placeholder={'On Category'} required
          onChange={(e) => setTxncategory(e.target.value)}
        />
        <input type="text" value={name} placeholder={'Name'} required
          onChange={(e) => setName(e.target.value)}
        />
        <input type="number" value={amount} placeholder={'Amount'} required
          onChange={(e) => setAmount(e.target.value)}
        />
        <input type="date" value={date} placeholder={'Date'} required
          onChange={(e) => setDate(e.target.value)}
        />
        <input type="text" value={description} placeholder={'Description'} required
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="submit-btn" type="submit">Add</button>
    </form>
  );
};

export default TransactionForm;
