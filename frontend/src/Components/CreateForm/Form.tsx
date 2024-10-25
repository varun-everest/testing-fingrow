import { useState } from 'react';
import './Form.css';

interface FormProps {
    input1: string,
    input2: string,
    handleSubmit: (input1: string, input2:number) => Promise<void>,
}

const Form = (props: FormProps) => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async(e: { preventDefault: () => void; } ) => {
        e.preventDefault();
        await props.handleSubmit(name, Number(amount));
        setName('');
        setAmount('');
    }   

  return (
    <form className="form-container" onSubmit={handleSubmit}>
        <input type="text" value={name} placeholder={props.input1} required
          onChange={(e) => setName(e.target.value)}
        />
        <input type="number" value={amount} placeholder={props.input2} required
          onChange={(e) => setAmount(e.target.value)}
        />
      <button className="submit-btn" type="submit">Create</button>
    </form>
  );
};

export default Form;
