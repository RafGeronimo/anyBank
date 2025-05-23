import styled from "styled-components";
import { Statement } from "../components/Statement";
import { Account } from "../presentation/Account";
import { Sidebar } from "../presentation/Sidebar";
import { TransactionForm } from "../presentation/TransactionForm";
import { useEffect, useState } from "react";
import { Transaction } from "../domain/entities/Transaction";
import ListTransactions from "../domain/useCases/ListTransactions";
import TransactionSupabaseRepository from "../infra/supabase/TransactionSupabaseRepository";

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const listTransactions = new ListTransactions(new TransactionSupabaseRepository());

const Home = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    listTransactions.execute().then((data) => setTransactions(data));
  }, [transactions]);
  return (
    <>
      <Sidebar />
      <Main>
        <Account />
        <TransactionForm />
      </Main>
      <div>
        <Statement allTransactions={transactions} />
      </div>
    </>
  );
};

export default Home;
