import { TransactionType } from "../entities/TransactionType";

export interface TransactionTypeRepository {
  listAll(): Promise<TransactionType[]>;
}
