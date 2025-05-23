import { Transaction } from "../entities/Transaction";

export interface TransactionRepository {
  createTransaction: (value: number, typeId: number, userId: string) => Promise<void>;
  listAll: () => Promise<Transaction[]>;
}
