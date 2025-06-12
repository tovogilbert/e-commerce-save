// src/core/usecases/user/CreateUser.ts
import { User } from "../../entities/user/User";
import { IUserRepository } from "../../../interfaces/repositories/IUserRepository";
import { hashPassword } from "../../../shared/utils/auth";
import { BusinessError } from "../../../shared/errors/BusinessError";
import { log } from "console";

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userData: Omit<User, "id">): Promise<User> {
    // Validation
    if (!userData.email || !userData.password || !userData.name) {
      throw new BusinessError("All fields are required", {
        errorCode: "VALIDATION_ERROR"
      });
    }

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new BusinessError("User with this email already exists", {
        errorCode: "AUTH_ERROR"
      });
    }

    // Hachage du mot de passe
    const hashedPassword = await hashPassword(userData.password);
    console.log(`Passwrod hasher: ${userData.password}`);
    
    return this.userRepository.create({
      ...userData,
      password: hashedPassword
    });
  }
}