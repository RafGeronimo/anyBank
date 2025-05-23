import { Transaction } from "../../domain/entities/Transaction";
import { TransactionItem } from "../../presentation/Transaction";
import { Container, Heading, MonthLabel, TransactionsList } from "./styles";

const groupTransactions = (transactions: Transaction[]): Record<string, Transaction[]> => {
  return transactions.reduce<Record<string, Transaction[]>>((acc, transaction) => {
    const monthName = transaction.date.toLocaleString("pt-BR", { month: "long" });
    const year = transaction.date.getFullYear();
    const key = `${monthName} ${year}`;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(transaction);
    return acc;
  }, {});
};

interface StatementProps {
  allTransactions: Transaction[];
}

export const Statement = ({ allTransactions }: StatementProps) => {
  const grouped = groupTransactions(allTransactions);

  return (
    <Container>
      <Heading>Extrato</Heading>
      <TransactionsList>
        {Object.entries(grouped).map(([monthYear, transactions]) => (
          <div key={monthYear}>
            <MonthLabel>{monthYear}</MonthLabel>
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        ))}
      </TransactionsList>
    </Container>
  );
};
