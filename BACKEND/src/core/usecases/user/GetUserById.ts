import { User } from "../../entities/user/User";
import { IUserRepository } from "../../../interfaces/repositories/IUserRepository";

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    if (!id) {
      throw new Error("User ID is required");
    }

    return this.userRepository.findById(id);
  }
}