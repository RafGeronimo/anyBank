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
import CreateTransaction from "../../domain/useCases/CreateTransaction";
import TransactionSupabaseRepository from "../../infra/supabase/TransactionSupabaseRepository";
import { useAuthContext } from "../../app/hooks/useAuthContext";
import { toast } from "react-toastify";

const listTransactionTypes = new ListTransactionType(new TransactionTypeSupabaseRepository());
const createTransaction = new CreateTransaction(new TransactionSupabaseRepository());

export const TransactionForm = () => {
  const [transactionType, setTransactionType] = useState("");
  const [transactionValue, setTransactionValue] = useState("");
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>([]);
  const { session } = useAuthContext();

  useEffect(() => {
    listTransactionTypes.execute().then((data) => {
      setTransactionTypes(data);
    });
  }, []);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log({
      transactionType,
      transactionValue,
    });
    if (session) {
      try {
        await createTransaction.execute(parseFloat(transactionValue), parseInt(transactionType), session.user.id);
        toast.success("Transação criada com sucesso!");
        setTransactionValue("");
        setTransactionType("");
      } catch (error) {
        console.error("Falha ao criar a trasação:", error);
        toast.error("Ops! Algo deu errado, tente novamente!");
      }
    }
  };

  return (
    <Card>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Heading>Nova transação</Heading>
          <fieldset>
            <FormLabel>Transação</FormLabel>
            <Dropdown value={transactionType} onChange={(evt) => setTransactionType(evt.target.value)} required>
              <option value="" disabled hidden>
                Selecione o tipo de transação
              </option>
              {transactionTypes.map((t) => (
                <option value={t.id} key={t.id}>
                  {t.display}
                </option>
              ))}
            </Dropdown>
          </fieldset>
          <fieldset>
            <FormLabel>Valor</FormLabel>
            <TextField
              placeholder="R$ 00,00"
              type="number"
              value={transactionValue}
              onChange={(evt) => setTransactionValue(evt.target.value)}
              required
            />
          </fieldset>
          <Button>Concluir transação</Button>
        </Form>
      </Wrapper>
    </Card>
  );
};
