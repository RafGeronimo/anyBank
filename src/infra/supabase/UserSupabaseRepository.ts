import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { supabase } from "./config";

export default class UserSupabaseRepository implements UserRepository {
  async createUser(user: Omit<User, "id">) {
    const { error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        emailRedirectTo: "http://localhost:5173/",
      },
    });
    if (error) {
      throw error;
    }
  }
}
