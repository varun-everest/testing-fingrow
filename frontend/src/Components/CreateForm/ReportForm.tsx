import { useState } from 'react';
import './Form.css';

interface ReportFormProps {
    handleSubmit: (reportType: string, startDate: string, endDate: string) => Promise<void>,
}

const ReportForm = (props: ReportFormProps) => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportType, setReportType] = useState('Total Summary')

    const handleSubmit = async(e: { preventDefault: () => void; } ) => {
        e.preventDefault();
        await props.handleSubmit(reportType, startDate, endDate);
        setReportType('Total Summary');
        setStartDate('');
        setEndDate('');
    }   

  return (
    <form className="form-container" onSubmit={handleSubmit}>
        <select value={reportType} onChange={(e) => {setReportType(e.target.value)}} required >
            <option>Total Summary</option>
            <option>Budget Summary</option>
            <option>Saving Goals Summary</option>
        </select>
        <input type="date" value={startDate} placeholder='From' required
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input type="date" value={endDate} placeholder='To' required
          onChange={(e) => setEndDate(e.target.value)}
        />
      <button className="submit-btn" type="submit">Generate</button>
    </form>
  );
};

export default ReportForm;
