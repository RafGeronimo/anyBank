import { TransactionType } from "./TransactionType";

export interface Transaction {
  id: number;
  value: number;
  type: TransactionType;
  date: Date;
}
