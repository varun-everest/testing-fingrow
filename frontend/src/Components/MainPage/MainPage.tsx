import { useContext, useState } from 'react';
import Form from '../CreateForm/Form';
import ReportForm from '../CreateForm/ReportForm';
import TransactionForm from '../CreateForm/TransactionForm';
import TitleTile from '../TitleTile/TitleTile';
import './MainPage.css' 
import { DataContext } from '../../Context/Context';
import RecentTransactions from '../Transaction/RecentTransactions';
import Report from '../Report/Report';


const MainPage = () => {

    const {username, isLogin, fetchTxns} = useContext(DataContext);
    const [reportData, setReportData] = useState({});
    const [reportType, setReportType] = useState('');
    const [totalExpenses, setTotalExpenses] = useState('');
    const [totalIncome, setTotalIncome] = useState('');
    const [showReport, setShowReport] = useState(false);
    
    const handleAddBudget = async(category: string, amount:number) => {
        const details = {
            category: category,
            allotedAmount: amount
        };
        try {
            const response = await fetch(`http://localhost:4000/fingrow/${username}/budgets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
            });
            const data = await response.text();
            console.log(data);
            if(response.status === 404) {
                alert(`${data}`);  //user not found
            } 
            else if(response.status === 400) {
                alert(`${data}`);  //Insufficent balance
            } 
            else if(response.status === 409) {
                alert(`${data}`);  //budget already exists
            }
            else if(response.status === 201) {
                alert(`${data}`);   //success
            }
            else {
              alert(`${data}`);
            }
        } catch (error) {
            console.error('There was a problem with the creating budget:', error);
            alert('Budget added failed');
        }
    };

    const handleAddGoal = async(goal: string, amount: number) => {
        const details = {
          title: goal,
          targetAmount: amount
        };

        try {
          const response = await fetch(`http://localhost:4000/fingrow/${username}/savingGoals`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(details),
          });
          const data = await response.text();
          console.log(data);
          if(response.status === 404) {
              alert(`${data}`);  //user not found
          } 
          else if(response.status === 409) {
            alert(`${data}`);  //goal already exists
          }
          else if(response.status === 201) {
              alert(`${data}`);   //success
          }
          else {
            alert(`${data}`);
          }
      } catch (error) {
          console.error('There was a problem with the adding goal:', error);
          alert('saving goal added failed');
      }
    };

    const handleAddTransaction = async(txnCategory: string, name: string, amount: number, date: string, description: string) => {

        const details = {
          txnCategory,
          name,
          amount,
          description, 
          date,
        }

        try {
          const response = await fetch(`http://localhost:4000/fingrow/${username}/transactions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(details)
          });

          const responseData = await response.text();
          if(response.status === 404) {
            alert(responseData);
          }
          else if(response.status === 400) {
            alert(responseData);
          }
          else if(response.status === 200) {
            fetchTxns();
            alert(responseData);
          }
        }
        catch(e) {
          console.error('There was a problem with the making transaction:', e);
          alert('Transaction failed');
        }
    };

    const handleGenerateReport = async(reportType: string, startDate: string, endDate: string) => {
        const details = {
          reportType: reportType,
          startDate: startDate,
          endDate: endDate
        };

        const response = await fetch(`http://localhost:4000/fingrow/${username}/reports`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(details)
        });

        if(response.status === 404) {
          alert("User not found");
        }
        else if(response.status === 400) {
          alert("No Report available");
        }
        else if(response.status === 200) {
          const data = await response.json();
          console.log(data.summary);
          setReportData(data.summary);
          setReportType(data.reportType);
          setTotalIncome(data.totalIncome ? data.totalIncome : '');
          setTotalExpenses(data.totalExpenses ? data.totalExpenses : '');
          setShowReport(true);
        }
    }


  return (
    <div className='main-container'>
      <p className='fingrow-title'>FinGrow Finance Tracker</p>
      <div className='hero-container'>
          <div>
              <h2>Welcome {username}</h2>
              <h3>Your One Stop Finance Management System</h3>
          </div>
          <img src='/assets/imag1-nobg.png' alt='financeImage' className='hero-image'/>
      </div>
      <div className='select-box'>
        <div className='individual-box'>
          <TitleTile imageName='budget' title='Create Budget' />
          <Form handleSubmit={handleAddBudget} input1='Category' input2='amount' />
        </div>
        <div className='individual-box'>
          <TitleTile imageName='saving' title='Create Saving Goal' />
          <Form handleSubmit={handleAddGoal} input1='Your Goal' input2='Target Amount'/>
        </div>
        <div className='individual-box'>
          <TitleTile imageName='transaction' title='Add Transaction' />
          <TransactionForm handleSubmit={handleAddTransaction} />
        </div>
      </div>
      <div className='select-box'>
        <div className='individual-box'>
          <TitleTile imageName='recent-transactions' title='Recent Transactions' />
          <RecentTransactions />
        </div>
        <div className='individual-box'>
          <TitleTile imageName='reports' title='Generate Reports' />
          <ReportForm handleSubmit={handleGenerateReport} />
          {showReport ? ( reportType === 'Total Summary' ? 
                <Report reportType={reportType} summary={reportData} totalExpenses={totalExpenses} totalIncome={totalIncome}/> : 
                <Report reportType = {reportType} summary={reportData} />
              ) : <div></div>
          }
        </div>
      </div>
    </div>
  );
}

export default MainPage;