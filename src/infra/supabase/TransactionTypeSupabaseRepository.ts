import { TransactionType } from "../../domain/entities/TransactionType";
import { TransactionTypeRepository } from "../../domain/repositories/TransactionTypeRepository";
import { supabase } from "./config";

export class TransactionTypeSupabaseRepository implements TransactionTypeRepository {
  async listAll(): Promise<TransactionType[]> {
    const { data, error } = await supabase.from("transaction_type").select("*");
    if (error) {
      throw error;
    }
    return data || [];
  }
}
