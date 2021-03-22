import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./style";
import { FiTrash } from 'react-icons/fi';

export function TransictionTable() {
    const { transactions, removeTransaction } = useTransactions();

    function handleRemoveTransaction(transactionId: number) {
        removeTransaction(transactionId);
    }

    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>
                                {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                                }).format(transaction.type === 'withdraw' ?  -transaction.amount : transaction.amount)
                            }</td>
                            <td>{transaction.category}</td>
                        <td>
                            {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}
                        </td>
                        <td>
                            <button type='button' onClick={() => handleRemoveTransaction(transaction.id)}>
                                <FiTrash size={16} color="#eb3333"/>
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}