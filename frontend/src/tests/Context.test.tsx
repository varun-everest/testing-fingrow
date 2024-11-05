import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useContext } from 'react';
import DataContextProvider, { DataContext, TTransaction} from '../Context/Context';
import userEvent from '@testing-library/user-event';


const ContextTestComponent = () => {
    const { username, setUserName, isLogin, setIsLogin, recentTxns, fetchTxns, setRecentTxns } = useContext(DataContext);

    const handleFetch = () => {
        setUserName('Virat');
        setIsLogin(true); 
        fetchTxns();  
    };

    return (
        <div>
            <p>Username: {username}</p>
            <p>Is loggedin: {isLogin ? 'Yes' : 'No'}</p>
            <button onClick={() => setUserName('Virat')}>Set Username</button>
            <button onClick={() => setIsLogin(true)}>Login</button>
            <button onClick={handleFetch}>Fetch Transactions</button>
            <div>
                {recentTxns.map((txn, index) => (
                    <p key={index}>
                        {txn.name} --- Rs. {txn.amount}
                    </p>
                ))}
            </div>
        </div>
    );
};

describe('Tests related to the DataContextProvider', () => {

    let setRecentTxns = jest.fn();
    
    test('should check for the default values', () => {
        render(
            <DataContextProvider>
                <ContextTestComponent />
            </DataContextProvider>
        );

        expect(screen.getByText(/Username:/)).toHaveTextContent('Username:');
        expect(screen.getByText(/Is loggedin: /)).toHaveTextContent('Is loggedin: No');
    });

    test('should updates the username when setUserName gets called', () => {
        render(
            <DataContextProvider>
                <ContextTestComponent />
            </DataContextProvider>
        );

        const setUserButton = screen.getByText('Set Username');
        fireEvent.click(setUserButton);

        expect(screen.getByText(/Username:/)).toHaveTextContent('Username: Virat');
    });

    test('updates isLogin when setIsLogin is called', () => {
        render(
            <DataContextProvider>
                <ContextTestComponent />
            </DataContextProvider>
        );

        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);

        expect(screen.getByText(/Is loggedin: /)).toHaveTextContent('Is loggedin: Yes');
    });

    test('should fetches the transactions when fetchTxns gets called', async () => {
        
        const mockResponseData: TTransaction[] = [
            { amount: 1000, txnCategory: 'budget', name: 'Groceries', date: '2024-11-01', description: 'Veggies' }
        ];
        
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve(mockResponseData),
            })
        ) as jest.Mock;

        

        render(
            <DataContextProvider>
                <ContextTestComponent />
            </DataContextProvider>
        );

        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

        const fetchButton = screen.getByRole('button',{name:'Fetch Transactions'});
        fireEvent.click(fetchButton);
        
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/fingrow/Virat/transactions/recent', { method: 'GET' });
            expect(mockConsoleLog).toHaveBeenCalledWith(mockResponseData);
        })
        
    });
});
