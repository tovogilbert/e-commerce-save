import { User } from "../../entities/user/User";
import { IUserRepository } from "../../../interfaces/repositories/IUserRepository";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(user: User): Promise<User> {
    if (!user.id) {
      throw new Error("User ID is required");
    }

    const existingUser = await this.userRepository.findById(user.id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    return this.userRepository.update(user);
  }
}