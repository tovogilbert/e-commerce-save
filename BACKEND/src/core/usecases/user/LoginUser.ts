import { User } from "../../entities/user/User";
import { IUserRepository } from "../../../interfaces/repositories/IUserRepository";
import { BusinessError } from "../../../shared/errors/BusinessError";
import { comparePasswords } from "../../../shared/utils/auth";

export class LoginUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(credentials: { email: string; password: string }): Promise<User> {
    const { email, password } = credentials;
    
    if (!email || !password) {
      throw new BusinessError("Email and password are required", {
        errorCode: "VALIDATION_ERROR"
      });
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BusinessError("Invalid credentials", {
        errorCode: "AUTH_ERROR"
      });
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new BusinessError("Invalid credentials", {
        errorCode: "AUTH_ERROR"
      });
    }

    return user;
  }
}