import { User } from "../../core/entities/user/User";

export interface IUserRepository {
  create(user: Omit<User, "id">): Promise<User>;

  findByEmail(email: string): Promise<User | null>;

  findById(id: string): Promise<User | null>;

  update(user: User): Promise<User>;
  
  findAll(): Promise<User[]>;

  delete(id: string): Promise<void>;
}