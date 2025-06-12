import { User } from "../../../core/entities/user/User";
import { UserResponseDTO, UserWithTokenResponseDTO } from "../dtos/responses/user.dto";

export class UserMapper {
  static toDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt || new Date(),
      updatedAt: user.updatedAt || new Date()
    };
  }

  static toDTOWithToken(user: User, token: string): UserWithTokenResponseDTO {
    return {
      ...this.toDTO(user),
      token
    };
  }

  static toDTOList(users: User[]): UserResponseDTO[] {
    return users.map(user => this.toDTO(user));
  }
}