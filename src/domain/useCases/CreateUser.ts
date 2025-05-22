import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export default class CreateUser {
  constructor(private userRepository: UserRepository) {}
  async execute(user: Omit<User, "id">) {
    this.userRepository.createUser(user);
  }
}
