import { TransactionTypeRepository } from "../repositories/TransactionTypeRepository";

export default class ListTransactionType {
  constructor(private repository: TransactionTypeRepository) {}

  async execute() {
    return this.repository.listAll();
  }
}
