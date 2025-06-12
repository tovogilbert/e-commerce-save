import { User } from "../../entities/user/User";
import { IUserRepository } from "../../../interfaces/repositories/IUserRepository";
import { BusinessError } from "../../../shared/errors/BusinessError";
import { comparePasswords } from "../../../shared/utils/auth";

export class LoginUser {
  constructor(private readonly userRepository: IUserRepository) {}

async execute(credentials: { email: string; password: string }): Promise<User> {
    const { email, password } = credentials;
    
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    
    if (!trimmedEmail || !trimmedPassword) {
      throw new BusinessError("Email et mot de passe requis", {
        errorCode: "VALIDATION_ERROR"
      });
    }

    const user = await this.userRepository.findByEmail(trimmedEmail);
    if (!user) {
      console.log('User not found:', email); 
      throw new BusinessError("Invalid credentials", {
        errorCode: "AUTH_ERROR"
      });
    }

    console.log('Stored hash:', user.password); 
    const isPasswordValid = await comparePasswords(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      throw new BusinessError("Invalid credentials", {
        errorCode: "AUTH_ERROR"
      });
    }

    return user;
}
}