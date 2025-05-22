import { useEffect, useState } from "react";
import { Form, Heading, Wrapper } from "./styles";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { TextField } from "../../components/TextField";
import { FormLabel } from "../../components/FormLabel";
import { Dropdown } from "../../components/Dropdown";
import ListTransactionType from "../../domain/useCases/ListTransactionType";
import { TransactionTypeSupabaseRepository } from "../../infra/supabase/TransactionTypeSupabaseRepository";
import { TransactionType } from "../../domain/entities/TransactionType";

const listTransactionTypes = new ListTransactionType(new TransactionTypeSupabaseRepository());

export const TransactionForm = () => {
  const [transactionType, setTransactionType] = useState("");
  const [transactionValue, setSetTransactionValue] = useState("");
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>([]);

  // useEffect(() => {
  //   // Defina uma função assíncrona dentro do useEffect
  //   const fetchTransactionTypes = async () => {
  //     try {
  //       const data = await listTransactionTypes.execute();
  //       setTransactionTypes(data);
  //     } catch (error) {
  //       console.error("Erro ao carregar os tipos de transação:", error);
  //     }
  //   };

  //   // Chame a função assíncrona
  //   fetchTransactionTypes();
  // }, []);

  useEffect(() => {
    listTransactionTypes.execute().then((data) => {
      setTransactionTypes(data);
    });
  }, []);

  const createTransacion = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log({
      transactionType,
      transactionValue,
    });
  };

  return (
    <Card>
      <Wrapper>
        <Form onSubmit={createTransacion}>
          <Heading>Nova transação</Heading>
          <fieldset>
            <FormLabel>Transação</FormLabel>
            <Dropdown value={transactionType} onChange={(evt) => setTransactionType(evt.target.value)} required>
              <option value="" disabled hidden>
                Selecione o tipo de transação
              </option>
              <option value="saque">Saque</option>
            </Dropdown>
          </fieldset>
          <fieldset>
            <FormLabel>Valor</FormLabel>
            <TextField
              placeholder="R$ 00,00"
              type="number"
              value={transactionValue}
              onChange={(evt) => setSetTransactionValue(evt.target.value)}
              required
            />
          </fieldset>
          <Button>Concluir transação</Button>
        </Form>
      </Wrapper>
    </Card>
  );
};
