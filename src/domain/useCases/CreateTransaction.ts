import { TransactionRepository } from "../repositories/TransactionRepository";

export default class CreateTransaction {
  constructor(private TransactionRepository: TransactionRepository) {}
  execute(value: number, typeId: number, userId: string): Promise<void> {
    return this.TransactionRepository.createTransaction(value, typeId, userId);
  }
}
