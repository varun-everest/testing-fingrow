import './Report.css'

interface ReportProps {
    totalIncome?: string,
    totalExpenses?: string,
    reportType: string,
    summary: object,
}

const Report = (props: ReportProps) => {

  return (
    <div className='report-container'>
        <p className='report-title'>{props.reportType}</p>
        <div className='report-header'>
            <p>Category</p>
            <p>Amount</p>
        </div>
        <div>
            {Object.entries(props.summary).map(([category, amount]) => (
                <div key={category} className='report-row'>
                    <p>{category}</p>
                    <p>{amount}</p>
                </div>    
            ))}
        </div>

        {props.reportType === 'Total Summary' && 
            <div className='total-summary'>
                <p className='income-value'>Total Income : {props.totalIncome}</p>
                <p className='expense-value'>Total Expenses : {props.totalExpenses} </p>
            </div>
        }
    </div>
  )
}

export default Report;