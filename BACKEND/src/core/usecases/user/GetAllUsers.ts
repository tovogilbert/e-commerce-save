import { User } from "../../entities/user/User";
import { IUserRepository } from "../../../interfaces/repositories/IUserRepository";

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}