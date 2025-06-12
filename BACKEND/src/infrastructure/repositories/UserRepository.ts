import { User } from "../../core/entities/user/User";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { UserModel } from "../db/models/userModel";
import { hashPassword } from "../../shared/utils/auth";

export class UserRepository implements IUserRepository {
 async create(user: Omit<User, "id">): Promise<User> {
  console.log('Mot de passe original:', user.password);
  console.log('Longueur du mot de passe:', user.password.length);
  
  const hashedPassword = await hashPassword(user.password);
  console.log('Mot de passe haché:', hashedPassword);
  
  const createdUser = await UserModel.create({
    ...user,
    password: hashedPassword
  });
  
  return this.toDomainEntity(createdUser);
}

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { email } });
    return user ? this.toDomainEntity(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findByPk(id);
    return user ? this.toDomainEntity(user) : null;
  }

  async update(user: User): Promise<User> {
    const [_, [updatedUser]] = await UserModel.update(
      {
        name: user.name,
        email: user.email,
        password: user.password
      },
      {
        where: { id: user.id },
        returning: true
      }
    );
    
    return this.toDomainEntity(updatedUser);
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.findAll();
    return users.map(this.toDomainEntity);
  }

  async delete(id: string): Promise<void> {
    await UserModel.destroy({ where: { id } });
  }

  private toDomainEntity(userModel: UserModel): User {
    return new User(
      userModel.id,
      userModel.name,
      userModel.email,
      userModel.password,
      userModel.createdAt,
      userModel.updatedAt
    );
  }
}