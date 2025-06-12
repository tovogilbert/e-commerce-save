import { IUserRepository } from "../../../interfaces/repositories/IUserRepository";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error("User ID is required");
    }

    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    await this.userRepository.delete(id);
  }
}