import { Transaction } from "../../domain/entities/Transaction";
import { TransactionAmount, TransactionDate, TransactionInfo, TransactionType, TransactionWrapper } from "./styles";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
  return date.toLocaleDateString("pt-BR", options);
};

interface TransactionProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionProps) => {
  const { value, type, date } = transaction;
  const formattedDate = formatDate(date);
  const formattedValue = currencyFormatter.format(value);

  return (
    <TransactionWrapper>
      <TransactionInfo>
        <TransactionType>{type.display}</TransactionType>
        <TransactionDate>{formattedDate}</TransactionDate>
      </TransactionInfo>
      <TransactionAmount>{formattedValue}</TransactionAmount>
    </TransactionWrapper>
  );
};
