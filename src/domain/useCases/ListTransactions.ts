import { TransactionRepository } from "../repositories/TransactionRepository";

export default class ListTransactions {
  constructor(private repository: TransactionRepository) {}
  async execute() {
    return this.repository.listAll();
  }
}
