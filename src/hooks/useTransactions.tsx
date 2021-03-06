import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';


interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
    removeTransaction: (transactionId: number) => void;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionProviderProps {
    children: ReactNode;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);


export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions').then(Response => setTransactions(Response.data.transactions));
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {...transactionInput, createdAt: new Date()});
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction
        ]);
    }
    function removeTransaction(transactionId: number) {
        const newTransacton = transactions.filter( ({id} ) => id !== transactionId)

        setTransactions(newTransacton);
    }

    return(
        <TransactionsContext.Provider value={{ transactions, createTransaction, removeTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}


export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}
