import { Transaction } from "../../domain/entities/Transaction";
import { TransactionRepository } from "../../domain/repositories/TransactionRepository";
import { supabase } from "./config";

export default class TransactionSupabaseRepository implements TransactionRepository {
  async listAll(): Promise<Transaction[]> {
    const { data, error } = await supabase.from("transaction").select(`*, transaction_type (id, display)`);

    if (error) {
      throw error;
    }

    return data.map((d) => ({
      id: d.id,
      date: new Date(d.created_at),
      type: d.transaction_type,
      value: d.value,
    }));
  }

  async createTransaction(value: number, typeId: number, userId: string) {
    const { error } = await supabase
      .from("transaction")
      .insert([{ transaction_type_id: typeId, user_id: userId, value }])
      .select();
    if (error) {
      throw error;
    }
  }
}
