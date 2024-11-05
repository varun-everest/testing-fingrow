import { createContext, ReactNode, useEffect, useState } from "react";

export type TTransaction = {
    amount: number,
    txnCategory: string,
    name: string,
    date: string,
    description: string
}

interface DataState {
    username: string,
    setUserName: React.Dispatch<React.SetStateAction<string>>,
    isLogin: boolean,
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,
    recentTxns: TTransaction[],
    setRecentTxns: React.Dispatch<React.SetStateAction<TTransaction[]>>,
    fetchTxns: () => Promise<void>,
}

const initalState: DataState = {
    username : '',
    setUserName: () => {},
    isLogin: false,
    setIsLogin: () => {},
    recentTxns: [],
    setRecentTxns: () => {},
    fetchTxns: async () => {},
}

export const DataContext = createContext<DataState>(initalState);

interface DataContextProviderProps {
    children: ReactNode;
}

const DataContextProvider: React.FC<DataContextProviderProps> = ({children}) => {

    const [username, setUserName] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [recentTxns, setRecentTxns] = useState<TTransaction[]>([]);

    const fetchTxns = async() => {
        if(!username) {
            return;
        }

        const response = await fetch(`http://localhost:4000/fingrow/${username}/transactions/recent`, {
            method:'GET',
        });
        if(response.status === 200){
            const data = await response.json();
            console.log(data);
            setRecentTxns(data);
        }
    }

    useEffect(() => {
        const fetchRecentTxns = async() => {
            if(!username) {
                return;
            }
    
            const response = await fetch(`http://localhost:4000/fingrow/${username}/transactions/recent`, {
                method:'GET',
            });
            if(response.status === 200){
                const data = await response.json();
                console.log(data);
                setRecentTxns(data);
            }
        }

        if (isLogin) {
            fetchRecentTxns();
        }
    }, [username, isLogin]);

    const value = {
        username,
        setUserName,
        isLogin,
        setIsLogin,
        recentTxns,
        setRecentTxns,
        fetchTxns,
    }

    return (
        <DataContext.Provider value= {value}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContextProvider;