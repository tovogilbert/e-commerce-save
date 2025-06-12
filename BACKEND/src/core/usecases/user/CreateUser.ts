import { User } from "../../entities/user/User";
import { IUserRepository } from "../../../interfaces/repositories/IUserRepository";
import { hashPassword } from "../../../shared/utils/auth";

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userData: Omit<User, "id">): Promise<User> {
    // Validation
    if (!userData.email || !userData.password || !userData.name) {
      throw new Error("All fields are required");
    }

    // Vérifier l'existence de l'utilisateur
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hachage du mot de passe
    const hashedPassword = await hashPassword(userData.password);

    // Création de l'utilisateur avec le mot de passe haché
    const userToCreate: Omit<User, "id"> = {
      ...userData,
      password: hashedPassword,
    };

    return this.userRepository.create(userToCreate);
  }
}
